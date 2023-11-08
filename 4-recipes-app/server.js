const express = require('express')
const request = require('request')

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())

const APP_KEY = 'b0e8f0949e6048068feb4dce560939d9'
const APP_ID = '8cb90537'


app.get('/recipes', (req, res) => {
  const query = req.query.q
  const options = {
    url: `https://api.edamam.com/api/recipes/v2/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`,
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  }

  request(options, (error, response, body) => {
    if (error) {
      console.error(error);
      res.status(500).send('Error fetching recipes');
      return
    }

    const data = JSON.parse(body);
    res.status(200).send(data)
  })
})

app.listen(port, () => {
  console.log(`Server listening on port ${port}`)
})