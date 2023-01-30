const bcrypt = require('bcrypt')
const round = 4

const encrypt = (password) => {
    return bcrypt.hashSync(String(password), round)
}

const decrypt = (password, hashPassword) => {
    return bcrypt.compareSync(String(password), hashPassword)
}

module.exports = { encrypt, decrypt }