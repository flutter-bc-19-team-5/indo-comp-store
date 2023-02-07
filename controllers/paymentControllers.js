const { payment, order } = require('../models')

class PaymentController {
    static async getData(req, res) {
        try {
            let payments = await payment.findAll({ include: order })
            res.json(payments)
        } catch (err) {
            res.json({ message: err })
        }
    }

    static async infoPayment(req, res) {
        try {
            let id = +req.params.paymentId
            let result = await payment.findByPk(id, {
                include: order
            })
            res.json(result)
        } catch (err) {
            res.json({ message: err })
        }
    }

    static async addPayment(req, res) {
        try {
            const { pay_total, pay_method, status } = req.body
            let response = await payment.create({
                pay_total: pay_total,
                pay_method: pay_method,
                status: status
            })
            res.json(response)
        } catch (err) {
            res.json({ message: err })
        }
    }

    static async deletePayment(req, res) {
        try {
            const id = +req.params.paymentId
            let response = await payment.destroy({ where: { id: id } })
            res.json(response)
        } catch (err) {
            res.json({ message: err })
        }
    }

    static async updatePayment(req, res) {
        try {
            const id = +req.params.paymentId
            const { pay_total, pay_method, status } = req.body
            let response = await payment.update({ pay_total, pay_method, status },
                { where: { id: id } })
            res.json(response[0])
        } catch (err) {
            res.json({ message: err })
        }
    }
}

module.exports = PaymentController