const User   =require('../models/userModel');
const asyncHandler = require('express-async-handler')
const db = require('../config/db')
const jwt = require('jsonwebtoken')

const protect = asyncHandler(async(req,res,next)=>{
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        token = req.headers.authorization.split(' ')[1]
        try {
            //console.log(token)
            const decoded = jwt.verify(token,process.env.JWT_SECRET)
            //console.log(decoded)
            if(decoded.id){
                req.userAuth = true
                req.userId = decoded.id
            }
            else{
                req.userAuth = false
                req.userId = decoded.id
            }

            next()
        } catch (error) {
            throw new Error(error)
        }
    }

    if(!token){
        res.status(401)
        throw new Error("Unauthorized Access!")
    }

})

module.exports = protect