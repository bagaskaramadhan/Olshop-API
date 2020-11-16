const express = require('express')
const app = express()
const { PORT } = require('./src/helper/env')
const router = require('./src/router/router')
const bodyParser = require('body-parser')
const path = require('path')

app.set('views', path.join(__dirname, 'src/views'));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use('/anakara-olshop', router)

app.listen(PORT, () => {
    console.log(`RUNNING ON PORT ${PORT}`)
})