const express = require('express')
const {getAll, insert, update, deleted, detail} = require('../controller/product')
const router = express.Router()

router
.get('/getAll', getAll)
.post('/insert', insert)
.patch('/update/:product_id', update)
.delete('/deleted/:product_id', deleted)
.get('/detail/:product_id', detail)

module.exports = router