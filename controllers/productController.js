const { product, customer, PageState, Sequelize } = require('../models')
const fs = require('fs')

class ProductController {
    //EJS Page
    static async getData(req, res) {
        try {
            const searchName = req.query.productName
            const operand = Sequelize.Op
            let products = null

            if (searchName === undefined) products = await product.findAll()
            else products = await product.findAll({ where: { name: { [operand.like]: `${searchName}%` } } })

            res.render("./product/index.ejs", { products })
        } catch (err) {
            res.json({ message: err })
        }
    }

    static addProductPage = (req, res) => res.render('./product/add.ejs', new PageState())

    static editProductPage = async (req, res) => {
        const { id } = req.params
        try {
            const response = await product.findByPk(id)
            res.render('./product/edit.ejs', new PageState(response))
        } catch (error) {
            res.render('./product/edit.ejs', new PageState(null, error))
        }
    }
    static infoProductPage = async (req, res) => {
        const { id } = req.params
        const state = new PageState({})
        try {
            const response = await product.findByPk(id, {
                include: customer
            })
            if (response) state.fields = response
            else state.error = { message: "Not found" }

            res.render('./product/info.ejs', state)
        } catch (error) {
            state.error = error
            res.render('./product/info.ejs', state)
        }
    }
    //CRUD
    static async addProduct(req, res) {
        try {
            const { name, type, brand, price, stock } = req.body
            //Upload Image
            const imageName = req.file.filename

            let response = await product.create({
                name: name,
                type: type,
                brand: brand,
                price: price,
                stock: stock,
                image: imageName
            })

            res.redirect("../../product")
        } catch (err) {
            res.render("./product/edit.ejs", new PageState(req.body, err))
        }
    }

    static async deleteProduct(req, res) {
        try {
            const id = +req.params.productId

            //Delete file in folder public/productImage
            let response = await product.findByPk(id)
            const path = `./public/productImage/${response.image}`
            fs.unlink(path, (err) => {
                if (err) console.error(err)
            })

            response = await product.destroy({ where: { id: id } })
            res.redirect("../../product")
        } catch (err) {
            res.render("./product/edit.ejs", new PageState(null, err))
        }
    }

    static async updateProduct(req, res) {
        try {
            const id = +req.params.productId
            const { name, type, brand, price, stock } = req.body

            //Check if image will be changed or not
            let updatingField = {}
            if (req.file === undefined) {
                updatingField = { name, type, brand, price, stock }
            } else {
                const image = req.file.filename
                updatingField = { name, type, brand, price, stock, image }
            }

            let response = await product.update(updatingField,
                { where: { id: id } })
            res.redirect("../../product")
        } catch (err) {
            res.render("./product/edit.ejs", new PageState(req.body, err))
        }
    }

}

module.exports = ProductController