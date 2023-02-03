const { category } = require('../models')

class CategoryController {
    static async getData(req, res) {
        try {
            let categories = await category.findAll()
            res.json(categories)
        } catch (err) {
            res.json({ message: err })
        }
    }

    static async addCategory(req, res) {
        try {
            const { name, type } = req.body
            let response = await category.create({ name, type })
            res.json(response)
        } catch (err) {
            res.json({ message: err })
        }
    }

    static async deleteCategory(req, res) {
        try {
            const id = +req.params.categoryId
            let response = await category.destroy({ where: { id: id } })
            res.json(response)
        } catch (err) {
            res.json({ message: err })
        }
    }
}

module.exports = CategoryController