const customerRoute = require('express').Router()
const { CustomerController } = require('../controllers')

//EJS Page
customerRoute.get('/', CustomerController.getData)
customerRoute.get('/addPage', CustomerController.addCustomerPage)
customerRoute.get('/editPage', CustomerController.editCustomerPage)

//CRUD
customerRoute.post('/add', CustomerController.addCustomer)
customerRoute.get('/delete/:customerId', CustomerController.deleteCustomer)
customerRoute.post('/update/:customerId', CustomerController.updateCustomer)

module.exports = customerRoute