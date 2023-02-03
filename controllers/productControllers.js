const { product, category, brand, Sequelize } = require('../models')
const fs = require('fs')

class ProductController {
    static async getData(req, res) {
        try {
            const search = req.params.productName
            const operand = Sequelize.Op
            let products = null

            if (search === undefined)
                products = await product.findAll({
                    order: [['name', 'ASC']],
                    include: [category, brand]
                })
            else
                products = await product.findAll({
                    where: { name: { [operand.like]: `%${search}%` } },
                    include: [category, brand]
                })

            res.json(products)
        } catch (err) {
            res.json({ message: err })
        }
    }

    static async infoProduct(req, res) {
        const id = +req.params.productId
        try {
            let response = await product.findByPk(id, { include: [category, brand] })
            res.json(response)
        } catch (err) {
            res.json({ message: err })
        }
    }

    static async addProduct(req, res) {
        try {
            const { name, price, stock, categoryId, brandId } = req.body
            let field = {}

            if (req.file === undefined) {
                field = { name, price, stock, categoryId, brandId }
            } else {
                const image = req.file.filename
                field = { name, price, stock, categoryId, brandId, image }
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
            const { name, price, stock, categoryId, brandId } = req.body
            let field = {}

            //Check if image will be changed or not
            if (req.file === undefined) {
                field = { name, price, stock, categoryId, brandId }
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
                field = { name, price, stock, categoryId, brandId, image }
            }

            let response = await product.update(field, { where: { id: id } })
            res.json(response[0])
        } catch (err) {
            res.json({ message: err })
        }
    }

}

module.exports = ProductController