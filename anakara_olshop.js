const express = require('express')
const app = express()
const { PORT } = require('./src/helper/env')
const router = require('./src/router/product')

app.use('/anakara-olshop/product', router)

app.listen(PORT, () => {
    console.log(`RUNNING ON PORT ${PORT}`)
})