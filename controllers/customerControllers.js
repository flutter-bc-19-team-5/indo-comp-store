const { customer, product, PageState } = require('../models')

class CustomerController {
    //EJS Page
    static async getData(req, res) {
        const state = new PageState()
        try {
            state.customers = await customer.findAll({
                include: product
            })
        } catch (err) {
            state.error = err
        }
        res.render('customer/index', state)
    }
    static addCustomerPage = (req, res) => res.render('customer/add', new PageState())

    static editCustomerPage = async (req, res) => {
        const state = new PageState()
        const { id } = req.params
        try {
            const response = await customer.findByPk(id)
            state.fields = response
        } catch (error) {
            state.error = error
        }
        res.render('customer/edit', state)
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
        } catch (error) {
            state.error = error
        }
        res.render('customer/info', state)
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
            res.render('customer/add', new PageState(req.body, err))
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
            res.render('customer/info', state)
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
            res.render('customer/edit', new PageState(req.body, err))
        }
    }

}

module.exports = CustomerController