const customerRoute = require('express').Router()
const { CustomerController } = require('../controllers')
const upload = require('../middlewares/uploadImage.js')

customerRoute.get('/read', CustomerController.getData)
customerRoute.get('/read/:customerName', CustomerController.getData)
customerRoute.get('/info/:customerId', CustomerController.infoCustomer)
customerRoute.post('/login', CustomerController.loginCustomer)

customerRoute.post('/add',
    upload('./public/profileImage').single('profileImage'),
    CustomerController.addCustomer)
customerRoute.delete('/delete/:customerId', CustomerController.deleteCustomer)
customerRoute.put('/update/:customerId',
    upload('./public/profileImage').single('profileImage'),
    CustomerController.updateCustomer)

module.exports = customerRoute