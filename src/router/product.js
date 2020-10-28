const express = require('express')
const controllerProduct = require('../controller/product')
const router = express.Router()

router
.get('/getAll', controllerProduct.getAll)

module.exports = router