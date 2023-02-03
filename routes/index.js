const route = require('express').Router()

route.get('/', (req, res) => {
    res.redirect("payment") // res.render('./index.ejs')
})

const productRoutes = require('./productRoutes.js')
const categoryRoutes = require('./categoryRoutes.js')
const brandRoutes = require('./brandRoutes.js')
const customerRoutes = require('./customerRoutes.js')
const orderRoutes = require('./orderRoutes.js')
const paymentRoutes = require('./paymentRoutes.js')

route.use('/products', productRoutes)
route.use('/categories', categoryRoutes)
route.use('/brands', brandRoutes)
route.use('/customers', customerRoutes)
route.use('/orders', orderRoutes)
route.use('/payments', paymentRoutes)

module.exports = route