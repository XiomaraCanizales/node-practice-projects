const express = require('express')
const { booksRouter } = require('./routes/books.router')
const app = express()

app.use(express.json())

app.get('/', (req, res) => {
    res.send('hi')
})

app.use('/books', booksRouter)

app.listen(process.env.PORT || 8000, () => {
    console.log('port open')
})
