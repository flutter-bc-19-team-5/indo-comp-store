const multer = require('multer')

const upload = (path) => multer({
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            //Save image into folder public/productImage
            cb(null, path)
        },
        filename: function (req, file, cb) {
            cb(null, new Date().valueOf() + '_' + file.originalname)
        }
    })
})

module.exports = upload