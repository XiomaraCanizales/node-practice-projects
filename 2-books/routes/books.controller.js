const { 
    getTitles, 
    getAllAuthors,
    getBooksPerYear,
    getBooksByPage
} = require('../models/books.model')

async function getAllBooks(req, res) {
    const titles = await getTitles()
    //res.json(titles)
    res.render('books', {books:titles})
}

async function getAuthors(req, res) {
    const authors = await getAllAuthors()
    //res.json(authors)
    res.render('authors', {authors})
}

async function getBestBooks(req, res) {
    //res.send('best books per year')
    const bestBooks = await getBooksPerYear()
    //res.json(bestBooks)
    res.render('bestbooks', {bestBooks})
}

async function getBigBooks(req, res) {
    //res.send('biggest books')
    const bigBooks = await getBooksByPage()
    //res.json(bigBooks)
    res.render('bigbooks', {books:bigBooks})
}

module.exports = {
    getAllBooks,
    getAuthors,
    getBestBooks,
    getBigBooks
}