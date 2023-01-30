const productRoutes = require('express').Router()
const multer = require('multer')
const { ProductController } = require('../controllers')

//Upload image
const imageUpload = multer({
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            //Save image into folder public/productImage
            cb(null, './public/productImage/')
        },
        filename: function (req, file, cb) {
            cb(null, new Date().valueOf() + '_' + file.originalname)
        }
    })
})

productRoutes.get('/read', ProductController.getData)
productRoutes.get('/read/:productName', ProductController.getData)
productRoutes.get('/info/:productId', ProductController.infoProduct)

productRoutes.post('/add', imageUpload.single('image'), ProductController.addProduct)
productRoutes.delete('/delete/:productId', ProductController.deleteProduct)
productRoutes.put('/update/:productId', imageUpload.single('image'), ProductController.updateProduct)

module.exports = productRoutes