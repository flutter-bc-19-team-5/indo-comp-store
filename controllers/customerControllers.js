const { customer, product, PageState } = require('../models')

class CustomerController {
    //EJS Page
    static async getData(req, res) {
        try {
            let customers = await customer.findAll({
                include: product
            })
            res.render("./customer/index.ejs", { customers })
        } catch (err) {
            res.json({ message: err })
        }
    }
    static addCustomerPage = (req, res) => res.render('./customer/add.ejs', new PageState())

    static editCustomerPage = async (req, res) => {
        const { id } = req.params
        try {
            const response = await customer.findByPk(id)
            res.render('./customer/edit.ejs', new PageState(response))
        } catch (error) {
            res.render('./customer/edit.ejs', new PageState(null, error.message))
        }
    }
    static infoCustomerPage = async (req, res) => {
        const { id } = req.params
        try {
            const response = await customer.findByPk(id, {
                include: product
            })
            res.render('./customer/info.ejs', new PageState(response))
        } catch (error) {
            res.render('./customer/info.ejs', new PageState(null, error))
        }
    }
    //CRUD
    static async addCustomer(req, res) {
        try {
            const { name, address, phone } = req.body
            /*
                let response = await customer.create({
                    name: name,
                    address: address,
                    phone: phone,
                })
            */
           const response = await new Promise((resolve, reject) => {
            setTimeout(() => {
                reject(true)
            }, 1000);
           })
            let data = response
                ? res.json({ message: "new Customer has been added" })
                : res.json({ message: response })

            res.redirect("./customer", data)
        } catch (err) {
            res.render("./customer/add.ejs", new PageState(req.body, err))
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
            // let response = await customer.update({ name, address, phone },
            //     { where: { id: id } })

           const response = await new Promise((resolve, reject) => {
            setTimeout(() => {
                reject(true)
            }, 1000);
           })

           let data = response
            ? res.json({ message: `Customer ${id} has been updated` })
            : res.json({ message: response })
            
            res.redirect("./customer", data)
        } catch (err) {
            res.render("./customer/add.ejs", new PageState(req.body, err))
        }
    }

}

module.exports = CustomerController