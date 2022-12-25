const productRoutes = require('express').Router()
const multer = require('multer')
const path = require('path')
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

//EJS Page
productRoutes.get('/', ProductController.getData)
productRoutes.get('/addPage', ProductController.addProductPage)
productRoutes.get('/editPage/:id', ProductController.editProductPage)
productRoutes.get('/infoPage/:id', ProductController.infoProductPage)

//CRUD
productRoutes.post('/add', imageUpload.single('image'), ProductController.addProduct)
productRoutes.get('/delete/:productId', ProductController.deleteProduct)
productRoutes.post('/update/:productId', imageUpload.single('image'), ProductController.updateProduct)


//Testing for post and get image
/**
productRoutes.post('/productImage', imageUpload.single('image'), (req, res) => {
    console.log(req.file.filename)
    res.json('/image api')
})
productRoutes.get('/productImage/:filename', (req, res) => {
    const { filename } = req.params
    const dirname = path.resolve()
    const fullfilepath = path.join(dirname, '/public/productImage/' + filename);
    return res.sendFile(fullfilepath)
})
**/

module.exports = productRoutes