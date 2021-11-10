const express = require('express')
const dotenv = require('dotenv')
const colors = require('colors')
const connectDB = require('./config/db')
const menuItems = require('./data/menuItems')
const restaurantRoutes = require('./routes/restaurantRoutes')
const itemRoutes = require('./routes/itemRoutes')
const { notFound, errorHandler} = require('./middleware/errorMiddleWare')

dotenv.config()

connectDB()

const app = express()

app.get('/', (req, res) => {
    res.send('API is running...')
})

app.get('/api/restaurant/:id', (req, res) => {
    const items = menuItems.filter(i => i.restaurantId === req.params.id)
    res.json(items)
})

app.use('/api/restaurants', restaurantRoutes)
app.use('/api/item', itemRoutes)

app.use(notFound)

app.use(errorHandler)

const PORT = process.env.PORT || 3003

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.green.bold))