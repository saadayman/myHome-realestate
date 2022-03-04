const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const  jwt  = require('jsonwebtoken')
const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,'Please Fill in this filed'],
        trim:true,
    },
    email:{
        type:String,
        match:[/^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,'Please enter a vaild email'],
        unique:true,
        trim:true,
        required:[true,'Please Fill in this filed']
    },
   
    password:{
        type:String,
        required:[true,'Please Fill in this filed'],
        minlength:[8,'password cannot be less than 6 chars'],
        select:false

        
    },
    confirm_password:{
        type:String,
        required:[true,'Please Fill in this filed'],
        minlength:[8,'password cannot be less than 6 chars'],
        select:false
        
    }
},{timestamps:true})
userSchema.pre('save',async function(next){
    const salt = await bcrypt.genSalt(10)
    this.password= await bcrypt.hash(this.password,salt)
    this.confirm_password = await bcrypt.hash(this.confirm_password,salt)

})
userSchema.methods.matchPasswords=async function(plainTextPassword){
   
    return await bcrypt.compare(plainTextPassword,this.password)
}
userSchema.methods.getSignedToken= async function(){
    return  await jwt.sign({id:this.id},`${process.env.TOKEN_SECRET}`,{
        expiresIn:`${process.env.TOKEN_EXPIRES}`
    })

}
module.exports = mongoose.model('User',userSchema)