const { customer } = require('../models')

class CustomerController {
    //EJS Page
    static async getData(req, res) {
        try {
            let response = await customer.findAll()
            return res.json(response)
        } catch (err) {
            return res.json({ message: err })
        }
    }

    static addCustomerPage = (req, res) => res.render('')
    static editCustomerPage = (req, res) => res.render('')

    //CRUD
    static async addCustomer(req, res) {
        try {
            const { name, address, phone } = req.body
            let response = await customer.create({
                name: name,
                address: address,
                phone: phone,
            })
            response
                ? res.json({ message: "new Customer has been added" })
                : res.json({ message: response })
            // return res.json(response)
        } catch (err) {
            return res.json({ message: err })
        }
    }

    static async deleteCustomer(req, res) {
        try {
            const id = +req.params.customerId
            let response = await customer.destroy({ where: { id: id } })
            return res.json({ message: "Customer has been deleted" })
        } catch (err) {
            return res.json({ message: err })
        }
    }

    static async updateCustomer(req, res) {
        try {
            const id = +req.params.customerId
            const { name, address, phone } = req.body
            let response = await customer.update({ name, address, phone },
                { where: { id: id } })
            return res.json({ message: `Customer ${id} has been updated` })
        } catch (err) {
            return res.json({ message: err })
        }
    }

}

module.exports = CustomerController