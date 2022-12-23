const { customer, payment, product } = require('../models')

class PaymentController {
    //EJS Page
    static async getData(req, res) {
        try {
            let payments = await payment.findAll({
                include: [customer, product]
            })
            res.render("./payment/index.ejs", { payments })
        } catch (err) {
            res.json({ message: err })
        }
    }

    static addPaymentPage = (req, res) => res.render('')
    static editPaymentPage = (req, res) => res.render('')

    //CRUD
    static async addPayment(req, res) {
        try {
            const { quantity, total, paymentMethod, customerId, productId } = req.body
            let response = await payment.create({
                quantity: quantity,
                total: total,
                paymentMethod: paymentMethod,
                customerId: customerId,
                productId: productId
            })
            return res.json({ message: "new Payment has been added" })
        } catch (err) {
            return res.json({ message: err })
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