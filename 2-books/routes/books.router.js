const express = require('express')
const { 
    getAllBooks, 
    getAuthors,
    getBestBooks,
    getBigBooks
} = require('./books.controller')

const booksRouter = express.Router()
const authorsRouter = express.Router()
const bestBooksRouter = express.Router()
const bigBooksRouter = express.Router()

booksRouter.get('/', getAllBooks)
authorsRouter.get('/', getAuthors)
bestBooksRouter.get('/', getBestBooks)
bigBooksRouter.get('/', getBigBooks)

module.exports = { 
    booksRouter ,
    authorsRouter,
    bestBooksRouter,
    bigBooksRouter
}

