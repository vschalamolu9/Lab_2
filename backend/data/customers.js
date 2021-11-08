const bcrypt = require('bcryptjs')

const customers = [
    {
        name: 'Vamsi Srinivas',
        email: 'vamsi@gmail.com',
        password: bcrypt.hashSync('password', 10),
    },
    {
        name: 'Srinivas',
        email: 'srinivas@gmail.com',
        password: bcrypt.hashSync('password', 10),
    }
]

module.exports = customers