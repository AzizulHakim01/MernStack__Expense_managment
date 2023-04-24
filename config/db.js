const mongoose = require('mongoose')
const colors = require('colors')

const connectDB = async ( ) =>{
    try {
       await mongoose.connect(process.env.MONGODB_URL)
       console.log(`Database connected on ${mongoose.connection.host}`.bgMagenta.white)
    } catch (error) {
        console.log(`${error}`.bgRed)
    }
}

module.exports = connectDB;

