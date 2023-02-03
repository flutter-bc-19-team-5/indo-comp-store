const { order, customer, product, payment } = require('../models')

class OrderController {
    static async getData(req, res) {
        try {
            let orders = await order.findAll({include: [customer, product, payment]})
            res.json(orders)
        } catch (err) {
            res.json({ message: err })
        }
    }

    static async addOrder(req, res) {
        try {
            const { customerId, productId, paymentId, quantity } = req.body
            let response = await order.create({ customerId, productId, paymentId, quantity })
            res.json(response)
        } catch (err) {
            res.json({ message: err })
        }
    }

    static async deleteOrder(req, res) {
        try {
            const id = +req.params.orderId
            let response = await order.destroy({ where: { id: id } })
            res.json(response)
        } catch (err) {
            res.json({ message: err })
        }
    }
}
module.exports = OrderController