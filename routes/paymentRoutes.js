const paymentRoutes = require('express').Router()
const { PaymentController } = require('../controllers')

paymentRoutes.get('/read', PaymentController.getData)
paymentRoutes.get('/info/:paymentId', PaymentController.infoPayment)
paymentRoutes.post('/add', PaymentController.addPayment)
paymentRoutes.delete('/delete/:paymentId', PaymentController.deletePayment)
paymentRoutes.put('/update/:paymentId', PaymentController.updatePayment)

module.exports = paymentRoutes