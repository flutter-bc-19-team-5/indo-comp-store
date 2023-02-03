const brandRoutes = require('express').Router()
const { BrandController } = require('../controllers')
const upload = require('../middlewares/uploadImage.js')

brandRoutes.get('/read', BrandController.getData)
brandRoutes.post('/add',
    upload('./public/brandLogo').single('logo'),
    BrandController.addBrand)
brandRoutes.delete('/delete/:brandId', BrandController.deleteBrand)

module.exports = brandRoutes