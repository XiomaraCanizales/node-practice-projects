const express = require('express')
const axios = require('axios')
const cheerio = require('cheerio')
const cors = require('cors')

// initialize express
const app = express()
app.use(cors())

// routes
app.get('/', (req, res) => {
    res.send('hello')
})

app.get('/news', (req, res) => {
    // scrapping
    const url = 'https://www.nytimes.com'
    axios(url)
        .then(response => {
            const html = response.data
            const $ = cheerio.load(html)
            const articles = []

            $('.css-9mylee', html).each(function() {
                const title = $(this).text()
                const url = $(this).find('a').attr('herf')
                articles.push({
                    title,
                    url
                })
            })
            //console.log(articles)
            res.json(articles)
        }).catch(err => console.log(err)) 
})




// oping port
app.listen(8000, () => {
    console.log('listening on port 8000')
})