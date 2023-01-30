const { customer, Sequelize } = require('../models')
const { decrypt } = require("../helpers/bcrypt")
const { generateToken } = require("../helpers/jsonwebtoken")

const fs = require('fs')

class CustomerController {
    static async getData(req, res) {
        try {
            const searchName = req.query.customerName
            const operand = Sequelize.Op
            let customers = null

            if (searchName === undefined) customers = await customer.findAll({ order: [['name', 'ASC']] })
            else customers = await customer.findAll({ where: { name: { [operand.like]: `%${searchName}%` } } })

            res.json(customers)
        } catch (err) {
            res.json({ message: err })
        }
    }

    static infoCustomer = async (req, res) => {
        const id = +req.params.customerId
        try {
            let response = await customer.findByPk(id)
            res.json(response)
        } catch (err) {
            res.json({ message: err })
        }
    }

    static async addCustomer(req, res) {
        try {
            const { name, address, phone, email, password } = req.body
            const profileImage = req.file.filename

            // let profileImage = ''
            // if (req.file === undefined) profileImage = null
            // else profileImage = req.file.filename

            let response = await customer.create({ name, address, phone, email, password, profileImage })
            res.json(response)

        } catch (err) {
            res.json({ message: err })
        }
    }

    static async deleteCustomer(req, res) {
        try {
            const id = +req.params.customerId

            //Delete file in folder public/profileImage
            let data = await customer.findByPk(id)
            const path = `./public/profileImage/${data.profileImage}`
            fs.unlink(path, (err) => {
                if (err) console.error(err)
            })

            let response = await customer.destroy({ where: { id: id } })
            res.json(response)
        } catch (err) {
            res.json({ message: err })
        }
    }

    static async updateCustomer(req, res) {
        try {
            const id = +req.params.customerId
            const { name, address, phone, email, password } = req.body

            let data = await customer.findByPk(id)

            let profileImage = data.profileImage
            if (req.file !== undefined) profileImage = req.file.filename

            let response = await customer.update(
                { name, address, phone, email, password, profileImage },
                { where: { id: id } }
            )

            // let response = ''
            // if (req.file === undefined) {
            //     response = await customer.update({ name, address, phone, email, password },
            //         { where: { id: id } })
            // } else {
            //     const profileImage = req.file.filename
            //     response = await customer.update({ name, address, phone, email, password, profileImage },
            //         { where: { id: id } })
            // }

            res.json(response)
        } catch (err) {
            res.json({ message: err })
        }
    }

    static async loginCustomer(req, res) {
        try {
            const { email, password } = req.body
            let customerData = await customer.findOne({ where: { email: email } })

            if (customerData) {
                if (decrypt(password, customer.email)) {
                    let accessToken = generateToken(customerData)
                    res.json(accessToken)
                } else {
                    res.json({ message: "Incorrect Password" })
                }
            } else {
                res.json({ message: "Member not found" })
            }

        } catch (err) {
            res.json({ message: err })
        }
    }

}

module.exports = CustomerController