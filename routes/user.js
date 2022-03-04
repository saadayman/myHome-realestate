const express = require('express')

const { registerUser, login,getUserListing,logout } = require('../controllers/user')
const { protect } = require('../config/auth')
const router= express.Router()

//rednering login and register page 
router.get('/login',(req,res,next)=>{
    res.render('login',{
        title:'Login',
        activePage:'',
        
    })
})
router.get('/register',(req,res,next)=>{
    res.render('register',{
        title:'Register',
        activePage:'',
        
    })
})



//Hnadling Login - register -logut - userInfo
router.route('/register').post(registerUser)
router.route('/login').post(login)
router.route('/listings').get(protect,getUserListing)
router.route('/logout').get(logout)
module.exports= router
