const mongoose = require('mongoose')

const dbConnect = async () =>{
    try {
        const db = await mongoose.connect(process.env.MONGODB_URI)
        console.log("database connect at",process.env.MONGODB_URI)
    } catch (error) {
     console.log(error.message)   
    }
}

module.exports = {
    dbConnect
}