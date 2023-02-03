const productRoutes = require('express').Router()
const { ProductController } = require('../controllers')
const upload = require('../middlewares/uploadImage.js')

productRoutes.get('/read', ProductController.getData)
productRoutes.get('/read/:productName', ProductController.getData)
productRoutes.get('/info/:productId', ProductController.infoProduct)

productRoutes.post('/add',
    upload('./public/productImage').single('image'),
    ProductController.addProduct)
productRoutes.delete('/delete/:productId', ProductController.deleteProduct)
productRoutes.put('/update/:productId',
    upload('./public/productImage').single('image'),
    ProductController.updateProduct)

module.exports = productRoutes