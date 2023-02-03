const { customer, Sequelize } = require('../models')
const { decrypt } = require("../helpers/bcrypt")
const { generateToken } = require("../helpers/jsonwebtoken")

const fs = require('fs')

class CustomerController {
    static async getData(req, res) {
        try {
            const searchName = req.params.customerName
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
            let field = {}

            if (req.file === undefined) {
                field = { name, address, phone, email, password }
            } else {
                const profileImage = req.file.filename
                field = { name, address, phone, email, password, profileImage }
            }

            let response = await customer.create(field)
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
            if (data !== null && data.profileImage !== "https://via.placeholder.com/150") {
                const path = `./public/profileImage/${data.profileImage}`
                fs.unlink(path, (err) => {
                    if (err) console.error(err)
                })
            }

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
            let field = {}

            //Check if profileImage will be changed or not
            if (req.file === undefined) {
                field = { name, address, phone, email, password }
            } else {
                //Delete file in folder public/profileImage
                let data = await customer.findByPk(id)
                if (data.profileImage !== "https://via.placeholder.com/150") {
                    const path = `./public/profileImage/${data.profileImage}`
                    fs.unlink(path, (err) => {
                        if (err) console.error(err)
                    })
                }

                const profileImage = req.file.filename
                field = { name, address, phone, email, password, profileImage }
            }

            let response = await customer.update(
                field, { where: { id: id }, individualHooks: true })
            res.json(response[0])
        } catch (err) {
            res.json({ message: err })
        }
    }

    static async loginCustomer(req, res) {
        try {
            const { email, password } = req.body
            let customerData = await customer.findOne({ where: { email: email } })

            if (customerData) {
                if (decrypt(password, customerData.password)) {
                    let accessToken = generateToken(customerData)
                    res.json({ accessToken, role: 'user' })
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