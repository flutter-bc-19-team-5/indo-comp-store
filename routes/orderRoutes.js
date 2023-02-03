const orderRoutes = require('express').Router()
const { OrderController } = require('../controllers')

orderRoutes.get('/read', OrderController.getData)
orderRoutes.post('/add', OrderController.addOrder)
orderRoutes.delete('/delete/:orderId', OrderController.deleteOrder)

module.exports = orderRoutes