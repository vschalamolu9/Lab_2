const asyncHandler = require('express-async-handler')
const kafka = require('../kafka/client')
const User = require('../models/userModel')



//@description User SignUp
//@route POST /api/users/signup
//@access Public
const signupUser = asyncHandler(async(req, res) => {

    kafka.make_request('user_signup', req.body, (err, results) => {
        if(err){
            res.status(500).json({
                error: err
            })
        }
        else{
            res.status(201).send(results)
        }
    })
})

//@description User Login
//@route POST /api/users/login
//@access Public
const loginUser = asyncHandler(async(req, res) => {
    kafka.make_request('user_login', req.body, (err, results) => {
        if(err){
            res.status(500).json({
                error: err
            })
        }
        else{
            res.status(200).send(results)
        }
    })
})


module.exports = { signupUser, loginUser }