const { product } = require('../models')

class ProductController {
    //EJS Page
    static async getData(req, res) {
        try {
            let response = await product.findAll()
            return res.json(response)
        } catch (err) {
            return res.json({ message: err })
        }
    }

    static addProductPage = (req, res) => res.render('')
    static editProductPage = (req, res) => res.render('')

    //CRUD
    static async addProduct(req, res) {
        try {
            const { name, type, brand, price, stock } = req.body
            let response = await product.create({
                name: name,
                type: type,
                brand: brand,
                price: price,
                stock: stock
            })
            return res.json({ message: "new Product has been added" })
        } catch (err) {
            return res.json({ message: err })
        }
    }

    static async deleteProduct(req, res) {
        try {
            const id = +req.params.productId
            let response = await product.destroy({ where: { id: id } })
            return res.json({ message: "Product has been deleted" })
        } catch (err) {
            return res.json({ message: err })
        }
    }

    static async updateProduct(req, res) {
        try {
            const id = +req.params.productId
            const { name, type, brand, price, stock } = req.body
            let response = await product.update({ name, type, brand, price, stock },
                { where: { id: id } })
            return res.json({ message: `Product ${id} has been updated` })
        } catch (err) {
            return res.json({ message: err })
        }
    }

}

module.exports = ProductController