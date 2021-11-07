const express = require('express')
const dotenv = require('dotenv')
const colors = require('colors')
const connectDB = require('./config/db')
const restaurants = require('./data/restaurants')
const menuItems = require('./data/menuItems')

dotenv.config()

connectDB()

const app = express()

app.get('/', (req, res) => {
    res.send('API is running...')
})

app.get('/api/restaurants', (req, res) => {
    res.json(restaurants)
})

app.get('/api/restaurants/:id', (req, res) => {
    const restaurant = restaurants.find(r => r._id === Number(req.params.id))
    res.json(restaurant)
})

app.get('/api/restaurant/:id', (req, res) => {
    const items = menuItems.filter(i => i.restaurantId === req.params.id)
    res.json(items)
})

const PORT = process.env.PORT || 5000

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.green.bold))