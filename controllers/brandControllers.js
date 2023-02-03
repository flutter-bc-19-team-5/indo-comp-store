const { brand } = require('../models')
const fs = require('fs')

class BrandController {
    static async getData(req, res) {
        try {
            let brands = await brand.findAll()
            res.json(brands)
        } catch (err) {
            res.json({ message: err })
        }
    }

    static async addBrand(req, res) {
        try {
            const { name } = req.body
            let field = {}

            if (req.file === undefined) {
                field = { name }
            } else {
                const logo = req.file.filename
                field = { name, logo }
            }

            let response = await brand.create(field)
            res.json(response)
        } catch (err) {
            res.json({ message: err })
        }
    }

    static async deleteBrand(req, res) {
        try {
            const id = +req.params.brandId

            //Delete file in folder public/brandLogo
            let data = await brand.findByPk(id)
            if (data.logo !== "https://via.placeholder.com/150") {
                const path = `./public/brandLogo/${data.logo}`
                fs.unlink(path, (err) => {
                    if (err) console.error(err)
                })
            }

            let response = await brand.destroy({ where: { id: id } })
            res.json(response)
        } catch (err) {
            res.json({ message: err })
        }
    }
}

module.exports = BrandController