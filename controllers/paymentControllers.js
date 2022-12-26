const { customer, payment, product, PageState } = require('../models')

class PaymentController {
    //EJS Page
    static async getData(req, res) {
        const state = new PageState()
        try {
            state.payments = await payment.findAll({
                include: [product, customer]
            })
        } catch (err) {
            state.error = err
        }
        res.render('payment/index', state)
    }

    static addPaymentPage = async (req, res) => {
        let state = new PageState()
        try {
            state.setFields({})
            state.fields.customers = await customer.findAll()
            state.fields.products = await product.findAll()

        } catch (error) {
            state.error = error.message
        }
        res.render('payment/add', state)
    }
    static editPaymentPage = async (req, res) => {
        const { id } = req.params
        try {
            const response = await payment.findByPk(id)
            res.render('payment/edit', new PageState(response))
        } catch (error) {
            res.render('payment/edit', new PageState(null, error))
        }
    }

    static infoPaymentPage = async (req, res) => {
        const { id } = req.params
        try {
            const response = await payment.findByPk(id, {
                include: [product, customer]
            })
            res.render('payment/info', new PageState(response))
        } catch (error) {
            res.render('payment/info', new PageState(null, error))
        }
    }
    //CRUD
    static async addPayment(req, res) {
        let data = new PageState({})
        try {
            const { quantity, paymentMethod, customerId, productId } = req.body
            const productResponse = await product.findByPk(productId)
            
            productResponse.stock -= quantity
            if (productResponse.stock >= 0){
                await product.update(productResponse.dataValues, { where: { id: productId } })
                await payment.create({
                    quantity: quantity,
                    total: productResponse.price * quantity,
                    paymentMethod: paymentMethod,
                    customerId: customerId,
                    productId: productId
                })
                res.redirect("../../payment")
            } else {
                data.fields = req.body
                data.fields.customers = await customer.findAll()
                data.fields.products = await product.findAll()
                data.error = { message: "there is no stock left" }

                res.render('payment/add', data)
            }
        } catch (err) {
            data.error = err
            res.render('payment/add', data)
        }
    }

    static async deletePayment(req, res) {
        try {
            const id = +req.params.paymentId
            let response = await payment.destroy({ where: { id: id } })
            return res.json({ message: "Payment has been deleted" })
        } catch (err) {
            return res.json({ message: err })
        }
    }

    //Optional
    static async updatePayment(req, res) {
        try {
            const id = +req.params.paymentId
            const { quantity, total, paymentMethod, customerId, productId } = req.body
            let response = await payment.update({ quantity, total, paymentMethod, customerId, productId },
                { where: { id: id } })
            return res.json({ message: `Payment ${id} has been updated` })
        } catch (err) {
            return res.json({ message: err })
        }
    }

}

module.exports = PaymentController