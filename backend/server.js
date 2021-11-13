const express = require('express')
const dotenv = require('dotenv')
const colors = require('colors')
const bodyParser = require('body-parser')
const connectDB = require('./config/db')
const restaurantRoutes = require('./routes/restaurantRoutes')
const dishRoutes = require('./routes/dishRoutes')
const { notFound, errorHandler } = require('./middleware/errorMiddleWare')

dotenv.config()

connectDB()

const app = express()

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({extended: true}));

app.use('/api/restaurants', restaurantRoutes)
app.use('/api/dishes', dishRoutes)

app.use(notFound)

app.use(errorHandler)

const PORT = process.env.PORT || 5000

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.green.bold))