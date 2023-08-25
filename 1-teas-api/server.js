const express = require('express')
const { teaRouter } = require('./routes/tea.router')
const app = express()

app.use(express.json())

app.get('/', (res, req) => {
    res.send('tea page')
})
app.use('/teas', teaRouter)

app.listen(process.env.PORT || 8000, () => {
    console.log('listening')
})