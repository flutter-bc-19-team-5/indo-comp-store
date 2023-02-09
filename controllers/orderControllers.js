const { order, customer, product, payment } = require('../models')

class OrderController {
    static async getData(req, res) {
        try {
            let orders = await order.findAll({ include: [customer, product, payment] })
            res.json(orders)
        } catch (err) {
            res.json({ message: err })
        }
    }

    static async infoOrder(req, res) {
        try {
            let id = +req.params.orderId
            let orderData = await order.findByPk(id, {
                include: [customer, product, payment]
            })
            res.json(orderData)
        } catch (err) {
            res.json({ message: err })
        }
    }

    static async infoCustomerOrder(req, res) {
        try {
            let id = +req.params.custId
            let orders = await order.findAll({
                where: { customerId: id },
                include: [product, payment]
            })
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