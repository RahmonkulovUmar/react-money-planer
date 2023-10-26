const express = require('express')
const app = express()
const cors = require('cors')
const {readdirSync} = require('fs')
const { db } = require('./db/db')
const { route } = require('./routes/transactions')

require('dotenv').config()

const PORT = process.env.PORT

app.use(express.json())
app.use(cors())

app.get('/', (req, res) => {
    res.send('Korea lover')
})

readdirSync('./routes').map((route) => {app.use('/api/v1', require('./routes/' + route))})

const server = () => {

    db()

    app.listen(PORT, () => {
        console.log('Listening to port: ', PORT)
    })
}

server()