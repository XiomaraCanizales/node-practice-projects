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
                    rating1: data.RatingDist1,
                    rating2: data.RatingDist2,
                    rating3: data.RatingDist3,
                    rating4: data.RatingDist4,
                    rating5: data.RatingDist5,
                    ratingAmount: data.RatingDistTotal,
                    countOfReviews: data.CountsOfReview,
                    publicationYear: data.PublishYear,
                    language: data.Language
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

async function getTitles() {
    try {
        const books = await loadBooksData()
        const titles = []
        for (const book of books) {
            titles.push(book.title)
        }
        return titles
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' })
    }
}

module.exports = { 
    getTitles
}