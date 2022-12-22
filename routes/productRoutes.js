const productRoutes = require('express').Router()
const { ProductController } = require('../controllers')

//EJS Page
productRoutes.get('/', ProductController.getData)
productRoutes.get('/addPage', ProductController.addProductPage)
productRoutes.get('/editPage', ProductController.editProductPage)

//CRUD
productRoutes.post('/add', ProductController.addProduct)
productRoutes.get('/delete/:productId', ProductController.deleteProduct)
productRoutes.post('/update/:productId', ProductController.updateProduct)

module.exports = productRoutes