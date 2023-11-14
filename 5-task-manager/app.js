const express = require('express')
const app = express()
const tasks = require('./routes/tasks.router')

// db connection
const connectDB = require('./db/connect')
require('dotenv').config()

// middleware
app.use(express.static('./public'))
app.use(express.json())

// routes
app.use('/api/v1/tasks', tasks)

// connect to db first, then open server
const port = 3000
const start = async () => {
    try {
        // secure db connection
        await connectDB(process.env.MONGO_URI)
        // open port
        app.listen(port, console.log(`server is listening on port ${port}...`))
    } catch (err) {
        console.log(err)
    }
}

start()