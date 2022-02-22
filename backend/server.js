const { application } = require('express');
const express = require('express')
const colors = require('colors')
const app = express();
const dotenv = require('dotenv').config()
const PORT = process.env.PORT || 5000;
const {errorHandler} = require('./middleware/errorMiddleware')
const connectDB = require('./config/db')

//connect to database
connectDB()

//to accept the json data
app.use(express.json())
//to accept the url encoded data
app.use(express.urlencoded({extended:false}))


//routes
app.use('/api/users', require('./routes/userRoutes'))
app.use('/api/tickets', require('./routes/ticketRoutes'))


app.use(errorHandler)

app.listen(PORT,() => console.log(`server started on port ${PORT}`))