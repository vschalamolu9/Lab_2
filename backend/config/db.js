const mongoose = require('mongoose')
const colors = require('colors')

const connectDB = async () => {
    try{
        const conn = await mongoose.connect('mongodb+srv://root:rootuser@projectcluster273.gghfx.mongodb.net/ubereats?retryWrites=true&w=majority',
            {
            useUnifiedTopology: true,
            useNewUrlParser: true
        })

        console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline)
    }
    catch(error){
        console.error(`Error: ${error.message}`.red.underline.bold)
        process.exit(1)
    }
}

module.exports = connectDB