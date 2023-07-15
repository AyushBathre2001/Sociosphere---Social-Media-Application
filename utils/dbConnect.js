const mongoose = require('mongoose')

const connectDB = ()=>{
    try {
        if(mongoose.connection.readyState === 1){
            return
        }
        else{
           const con =  mongoose.connect(process.env.DB_URI)
           if(con){
            console.log("Connected")
           }
           else{
            console.log("Not connected")
           }
        }
    } catch (error) {
        console.log(error)
    }
}

module.exports = connectDB