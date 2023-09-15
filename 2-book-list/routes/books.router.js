const express = require('express')
const { getAllBooks } = require('./books.controller')
const booksRouter = express.Router()

booksRouter.get('/', getAllBooks)

module.exports = { 
    booksRouter 
}

