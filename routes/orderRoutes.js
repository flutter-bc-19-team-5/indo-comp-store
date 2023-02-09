const orderRoutes = require('express').Router()
const { OrderController } = require('../controllers')

orderRoutes.get('/read', OrderController.getData)
orderRoutes.get('/info/:orderId', OrderController.infoOrder)
orderRoutes.get('/orderByCust/:custId', OrderController.infoCustomerOrder)
orderRoutes.post('/add', OrderController.addOrder)
orderRoutes.delete('/delete/:orderId', OrderController.deleteOrder)

module.exports = orderRoutes