const productRoutes = require('express').Router()
const { ProductController } = require('../controllers')

//EJS Page
productRoutes.get('/', ProductController.getData)
productRoutes.get('/addPage', ProductController.addProductPage)
productRoutes.get('/editPage/:id', ProductController.editProductPage)
productRoutes.get('/infoPage/:id', ProductController.infoProductPage)

//CRUD
productRoutes.post('/add', ProductController.addProduct)
productRoutes.get('/delete/:productId', ProductController.deleteProduct)
productRoutes.post('/update/:productId', ProductController.updateProduct)

module.exports = productRoutes