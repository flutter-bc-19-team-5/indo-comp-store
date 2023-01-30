const jwt = require('jsonwebtoken')
const secret = 'indoCompStore'

const generateToken = (member) => {
    const { id, name, phone, profilImage, userName } = member
    return jwt.sign({ id, name, phone, profilImage, userName }, secret)
}

const verifyToken = (member) => {
    return jwt.verify(member, secret)
}

module.exports = { generateToken, verifyToken }