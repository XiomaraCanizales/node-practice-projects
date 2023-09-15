const { getTitles } = require('../models/books.model')

// display by books
/* async function getAllBooks(req, res) {
    try {
        const booksArr = await loadBooksData()
        const titles = booksArr.map(book => book.title)
        return res.json(titles)
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' })
    }
} */

function getAllBooks(req, res) {
    return res.status(200).json(getTitles)
}

module.exports = {
    getAllBooks
}