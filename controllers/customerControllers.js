const { customer, product, PageState, Sequelize } = require('../models')

class CustomerController {
    //EJS Page
    static async getData(req, res) {
        try {
            const searchName = req.query.customerName
            const operand = Sequelize.Op
            let customers = null

            if (searchName === undefined) customers = await customer.findAll()
            else customers = await customer.findAll({ where: { name: { [operand.like]: `${searchName}%` } } })

            res.render("./customer/index.ejs", { customers })
        } catch (err) {
            res.json({ message: err })
        }
    }

    static addCustomerPage = (req, res) => res.render('./customer/add.ejs', new PageState())

    static editCustomerPage = async (req, res) => {
        const state = new PageState()
        const { id } = req.params
        try {
            const response = await customer.findByPk(id)
            state.fields = response
            res.render('./customer/edit.ejs', state)
        } catch (error) {
            state.error = error
            res.render('./customer/edit.ejs', state)
        }
    }
    static infoCustomerPage = async (req, res) => {
        const { id } = req.params
        const state = new PageState({})
        try {
            const response = await customer.findByPk(id, {
                include: product
            })
            if (response) state.fields = response
            else state.error = { message: "Not found" }

            res.render('./customer/info.ejs', state)
        } catch (error) {
            state.error = error
            res.render('./customer/info.ejs', state)
        }
    }
    //CRUD
    static async addCustomer(req, res) {
        try {
            const { name, address, phone } = req.body
            let response = await customer.create({
                name: name,
                address: address,
                phone: phone,
            })
            /*let data = response
                ? res.json({ message: "new Customer has been added" })
                : res.json({ message: response })*/

            res.redirect("../../customer")
        } catch (err) {
            res.render("./customer/add.ejs", new PageState(req.body, err))
        }
    }
    static async deleteCustomer(req, res) {
        const state = new PageState({})
        try {
            const id = +req.params.customerId
            await customer.destroy({ where: { id: id } })
            /*let message = response === 1 
                ? "Customer has been deleted" 
                : `Couldn\'t delete customer id ${id}`*/
            res.redirect("../../customer")

        } catch (err) {
            state.fields = req.body
            state.error = err
            res.render("./customer/info.ejs", state)
        }
    }

    static async updateCustomer(req, res) {
        try {
            const id = +req.params.customerId
            const { name, address, phone } = req.body
            let response = await customer.update({ name, address, phone },
                { where: { id: id } })

            /*let data = response
             ? res.json({ message: `Customer ${id} has been updated` })
             : res.json({ message: response })*/

            res.redirect("../../customer")
        } catch (err) {
            res.render("./customer/edit.ejs", new PageState(req.body, err))
        }
    }

}

module.exports = CustomerController