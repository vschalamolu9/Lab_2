const mongoose = require('mongoose')
const dotenv = require('dotenv')
const colors = require('colors')
const dishes = require('./data/dishes')
const restaurants = require('./data/restaurants')
const Dish = require('./models/dishModel')
const Restaurant = require('./models/restaurantModel')
const connectDB = require('./config/db')

dotenv.config()

connectDB()

const importData = async () => {
    try{
        await Restaurant.deleteMany()
        await Dish.deleteMany()

        const createdRestaurants = await Restaurant.insertMany(restaurants)
        const sampleDishes = dishes.map(dish => {
            return {...dish, restaurantId: createdRestaurants[0]}
        })
        await Dish.insertMany(sampleDishes)

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
        await Dish.deleteMany()

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