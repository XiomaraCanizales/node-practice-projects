/* FIRST MODEL
const books = [
    {id: '1', title: 'Harry Potter and the Half-Blood Prince (Harry Potter  #6)', author: 'J.K. Rowling', rating: '4.57'},
    {id: '2', title: 'The Lord of the Rings (The Lord of the Rings  #1-3)', author: 'J.R.R. Tolkien', rating: '4.50'},
    {id: '3', title: 'Anna Karenina', author: 'Leo Tolstoy', rating: '4.05'},
    {id: '4', title: 'Cien años de soledad', author: 'Gabriel García Márquez', rating: '4.07'},
    {id: '5', title: 'Memoirs of a Geisha', author: 'Arthur Golden', rating: '4.11'} 
]

module.exports = { books } 
*/

// SECOND MODEL
/* CSV headers:
Id, Name, RatingDist1, pagesNumber, RatingDist4, RatingDistTotal, PublishMonth, PublishDay, Publisher,  
CountsOfReview, PublishYear, Language, Authors, Rating, RatingDist2, RatingDist5, RatingDist3 */

const { parse } = require('csv-parse')
const fs = require('fs')
const path = require('path')

function loadBooksData() {
    return new Promise((resolve, reject) => {
        const booksArr = []
        fs.createReadStream(path.join(__dirname, '..', 'data', 'books.csv'))
            .pipe(parse({
                columns: true
            }))
            .on('data', (data) => {
                const book = {
                    bookID: data.Id,
                    title: data.Name,
                    pagesNumber: data.pagesNumber,
                    authors: data.Authors,
                    rating: data.Rating,
                    ratingAmount: data.RatingDistTotal,
                    countOfReviews: data.CountsOfReview,
                    publicationYear: data.PublishYear,
                }
                booksArr.push(book)

            })
            .on('error', (err) => {
                reject(err)
            })
            .on('end', () => {
                resolve(booksArr)
                console.log('end of file')
            })
    })
}

async function getTitles(req, res) {
    try{
        const booksArr = await loadBooksData()
        return booksArr.map(book => book.title)
    } catch (error) {
        res.status(500).json({error: ''})
    }
}

async function getAllAuthors(req, res) {
    try{
        const booksArr = await loadBooksData()
        const authors = new Set()
        for (const book of booksArr) {
            console.log(book.title)
            authors.add(book.authors)
        }
        return Array.from(authors)
    } catch (error) {
        res.status(500).json({error: ''})
    }
}

async function getBooksPerYear(req, res) {
    try {
        const booksArr = await loadBooksData()
        const bestBooks = {}
        // get years
        for (const book of booksArr) {
            const year = book.publicationYear
            // store unique years
            if (!bestBooks[year]) {
                bestBooks[year] = []            
            }
            bestBooks[year].push({
                title: book.title,
                rating: book.rating
            })
        }
        // sort best by year and rating
        for (const year in bestBooks) {
            bestBooks[year].sort((a, b) => b.rating - a.raing)
        }
        // get top 5
        for (const year in bestBooks) {
            bestBooks[year] = bestBooks[year].slice(0,5)
        }
        return bestBooks
    } catch (error) {
        res.status(500).json({error: ''})
    }
}

async function getBooksByPage(req, res) {
    try {
        const booksArr = await loadBooksData()
        const bookTitles = []
        for (const book of booksArr) {
            if (book.pagesNumber >= 500) {
                bookTitles.push({
                    title: book.title,
                    pages: book.pagesNumber
                })
            }
        }
        return bookTitles
    } catch (error) {
        res.status(500).json({error: ''})
    }
} 

module.exports = { 
    getTitles,
    getAllAuthors,
    getBooksPerYear,
    getBooksByPage
}