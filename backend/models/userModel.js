const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const Schema = mongoose.Schema

const userSchema = new Schema({
    firstName: { type: String, required: true},
    lastName: { type: String, required: true},
    emailId: {type: String, required: true},
    password: {type: String, required: true},
    contact: { type: String, default: ''},
    address: {
        street: {type: String, default: ''},
        city: {type: String, required: true},
        state: { type: String, required: true},
        country: {type: String, required: true},
        zipCode: {type: String, default: true}
    },
    imageUrl: { type: String, default: ''},
    favourites: [{type: String}]
},
    {
        timestamps: true
    })

userSchema.methods.matchPassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password)
}

const User = mongoose.model('User', userSchema)
module.exports = User