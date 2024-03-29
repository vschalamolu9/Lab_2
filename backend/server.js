const express = require('express')
const dotenv = require('dotenv')
const colors = require('colors')
const bodyParser = require('body-parser')
const connectDB = require('./config/db')
const restaurantRoutes = require('./routes/restaurantRoutes')
const dishRoutes = require('./routes/dishRoutes')
const userRoutes = require('./routes/userRoutes')
const orderRoutes = require('./routes/orderRoutes')
const cors = require('cors')
const { notFound, errorHandler } = require('./middleware/errorMiddleWare')
const passport = require('passport')
const app = express()
const schema = require('./graphQL/index')
const { graphqlHTTP } = require('express-graphql')

let corsOptions = {
    origin: 'http://localhost:3000'
}

app.use(cors())

dotenv.config()

connectDB()

app.use(passport.initialize())

const { auth } = require('./utils/passport')
auth()

require('./config/passport')(passport)


app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}))

app.use(bodyParser.json());
app.use(express.json())
app.use(bodyParser.urlencoded({extended: true}));

app.use('/api/restaurants', restaurantRoutes)
app.use('/api/dishes', dishRoutes)
app.use('/api/users', userRoutes)
app.use('/api/orders',orderRoutes)

app.use(notFound)

app.use(errorHandler)

const PORT = process.env.PORT || 5000

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.green.bold))
