const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const Schema = mongoose.Schema

const userSchema = new Schema({
    firstName: { type: String },
    lastName: { type: String },
    emailId: {type: String, unique: true},
    password: {type: String },
    contact: { type: String },
    address: {
        street: {type: String },
        city: {type: String },
        state: { type: String },
        country: {type: String },
        zipCode: {type: String }
    },
    imageUrl: { type: String },
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