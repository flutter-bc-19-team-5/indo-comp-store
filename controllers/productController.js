const { product, Sequelize } = require('../models')
const fs = require('fs')

class ProductController {
    static async getData(req, res) {
        try {
            const search = req.params.productName
            const operand = Sequelize.Op
            let products = null

            if (search === undefined) products = await product.findAll({ order: [['name', 'ASC']] })
            else products = await product.findAll({ where: { name: { [operand.like]: `%${search}%` } } })

            res.json(products)
        } catch (err) {
            res.json({ message: err })
        }
    }

    static async infoProduct(req, res) {
        const id = +req.params.productId
        try {
            let response = await product.findByPk(id)
            res.json(response)
        } catch (err) {
            res.json({ message: err })
        }
    }

    static async addProduct(req, res) {
        try {
            const { name, type, brand, price, stock } = req.body
            let field = {}

            if (req.file === undefined) {
                field = { name, type, brand, price, stock }
            } else {
                const image = req.file.filename
                field = { name, type, brand, price, stock, image }
            }

            let response = await product.create(field)
            res.json(response)
        } catch (err) {
            res.json({ message: err })
        }
    }

    static async deleteProduct(req, res) {
        try {
            const id = +req.params.productId

            //Delete file in folder public/productImage
            let data = await product.findByPk(id)
            if (data.image !== "https://via.placeholder.com/150") {
                const path = `./public/productImage/${data.image}`
                fs.unlink(path, (err) => {
                    if (err) console.error(err)
                })
            }

            let response = await product.destroy({ where: { id: id } })
            res.json(response)
        } catch (err) {
            res.json({ message: err })
        }
    }

    static async updateProduct(req, res) {
        try {
            const id = +req.params.productId
            const { name, type, brand, price, stock } = req.body
            let field = {}

            //Check if image will be changed or not
            if (req.file === undefined) {
                field = { name, type, brand, price, stock }
            } else {
                //Delete file in folder public/productImage
                let data = await product.findByPk(id)
                if (data.image !== "https://via.placeholder.com/150") {
                    const path = `./public/productImage/${data.image}`
                    fs.unlink(path, (err) => {
                        if (err) console.error(err)
                    })
                }

                const image = req.file.filename
                field = { name, type, brand, price, stock, image }
            }

            let response = await product.update(field, { where: { id: id } })
            res.json(response[0])
        } catch (err) {
            res.json({ message: err })
        }
    }

}

module.exports = ProductController