const mongoose = require('mongoose')
const dotenv = require('dotenv')
const Listing = require('./models/Listing')
const User = require('./models/User')
dotenv.config({path:'./config/config.env'})
async function connect(){
    try {
      const conn=   await mongoose.connect(`${process.env.MONGOOSE_URI}`)
        console.log('connected db '+conn.connection.host)
    } catch (error) {
        console.log(error)
        process.exit(1)
    }

}
connect()

async function emptyDb(){
    try {
       
        await Listing.deleteMany()
        await User.deleteMany()
        console.log('Data base empty')
        process.exit(1)
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}
if(process.argv[2]==='-d'){
    
    emptyDb()
}
