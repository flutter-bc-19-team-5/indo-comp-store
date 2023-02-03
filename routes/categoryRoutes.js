const categoryRoutes = require('express').Router()
const { CategoryController } = require('../controllers')

categoryRoutes.get('/read', CategoryController.getData)
categoryRoutes.post('/add', CategoryController.addCategory)
categoryRoutes.delete('/delete/:categoryId', CategoryController.deleteCategory)

module.exports = categoryRoutes