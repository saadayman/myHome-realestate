const LocalStrategy = require('passport-local').Strategy
const User = require('../models/User')

module.exports = async(passport)=>{
    passport.use(new LocalStrategy({
        usernameField:'email'

    },async(email,password,done)=>{
        let user = await User.findOne({email:email}).select('+password')
        if(!user){

            return done(null,false,{message:'That email is not registered'}) 
        }
        if(!(await user.matchPasswords(password))){
            
            return   done(null,false,{message:'wrong password'}) 
        }
       
        return done(null,user)
    }
    ))
passport.serializeUser((user,done)=>{
    done(null,user.id)//req.passport.session = {id:user id }
})
passport.deserializeUser((id,done)=>{
    User.findById(id,(err,user)=>{
        done(err,user)
    })
})

}