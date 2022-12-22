const route = require('express').Router()

route.get('/', (req, res) => {
    res.render('./index.ejs')
})

const customerRoutes = require('./customerRoutes.js')
const productRoutes = require('./productRoutes.js')
const paymentRoutes = require('./paymentRoutes.js')

route.use('/customer', customerRoutes)
route.use('/product', productRoutes)
route.use('/payment', paymentRoutes)

module.exports = route