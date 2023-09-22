const express = require('express')
const ejs = require('ejs')
const path = require('path')
const { 
    booksRouter, 
    authorsRouter,
    bestBooksRouter,
    bigBooksRouter
} = require('./routes/books.router')

const app = express()
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

app.use(express.json())

app.get('/', (req, res) => {
    res.send('hi')
})

app.use('/books', booksRouter)
app.use('/authors', authorsRouter)
app.use('/bestbooks', bestBooksRouter)
app.use('/bigbooks', bigBooksRouter)

app.listen(process.env.PORT || 8000, () => {
    console.log('port open')
})
