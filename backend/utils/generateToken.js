const jwt = require('jsonwebtoken')

const generateToken = (id) => {
    return jwt.sign({id}, 'secret_key_ubereats', {
        expiresIn: '10d'
    })
}

module.exports = generateToken