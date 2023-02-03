const ProductController = require('./productControllers')
const CategoryController = require('./categoryControllers')
const BrandController = require('./brandControllers')
const CustomerController = require('./customerControllers')
const OrderController = require('./orderControllers')
const PaymentController = require('./paymentControllers')

module.exports = {
    CustomerController, ProductController, CategoryController,
    BrandController, OrderController, PaymentController
}