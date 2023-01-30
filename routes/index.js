const route = require('express').Router()

route.get('/', (req, res) => {
    res.redirect("payment") // res.render('./index.ejs')
})

const productRoutes = require('./productRoutes.js')
const customerRoutes = require('./customerRoutes.js')
const paymentRoutes = require('./paymentRoutes.js')

route.use('/products', productRoutes)
route.use('/customers', customerRoutes)
route.use('/payments', paymentRoutes)

module.exports = route