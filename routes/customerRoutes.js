const customerRoute = require('express').Router()
const multer = require('multer')
const { CustomerController } = require('../controllers')

//Upload image
const imageUpload = multer({
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            //Save image into folder public/profileImage
            cb(null, './public/profileImage/')
        },
        filename: function (req, file, cb) {
            cb(null, new Date().valueOf() + '_' + file.originalname)
        }
    })
})

customerRoute.get('/read', CustomerController.getData)
customerRoute.get('/read/:customerName', CustomerController.getData)
customerRoute.get('/info/:customerId', CustomerController.infoCustomer)
customerRoute.post('/login', CustomerController.loginCustomer)

customerRoute.post('/add', imageUpload.single('profileImage'), CustomerController.addCustomer)
customerRoute.delete('/delete/:customerId', CustomerController.deleteCustomer)
customerRoute.put('/update/:customerId', imageUpload.single('profileImage'), CustomerController.updateCustomer)

module.exports = customerRoute