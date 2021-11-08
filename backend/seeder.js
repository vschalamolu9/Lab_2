const mongoose = require('mongoose')
const dotenv = require('dotenv')
const colors = require('colors')
const customers = require('./data/customers')
const items = require('./data/menuItems')
const restaurants = require('./data/restaurants')
const Customer = require('./models/customerModel')
const Item = require('./models/itemModel')
const Restaurant = require('./models/restaurantModel')
const connectDB = require('./config/db')

dotenv.config()

connectDB()

const importData = async () => {
    try{
        await Restaurant.deleteMany()
        await Item.deleteMany()

        const createdRestaurants = await Restaurant.insertMany(restaurants)
        const sampleItems = items.map(item => {
            return {...item, restaurant: createdRestaurants[0]}
        })
        await Item.insertMany(sampleItems)

        console.log('Data Imported!'.green.inverse)
        process.exit()
    }
    catch(error){
        console.error(`${error}`.red.inverse)
        process.exit(1)
    }
}

const destroyData = async () => {
    try{
        await Restaurant.deleteMany()
        await Item.deleteMany()

        console.log('Data Destroyed!'.red.inverse)
        process.exit()
    }
    catch(error){
        console.error(`${error}`.red.inverse)
        process.exit(1)
    }
}

if(process.argv[2] === '-d'){
    destroyData()
}
else{
    importData()
}