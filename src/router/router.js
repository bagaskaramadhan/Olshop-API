const express = require('express')
const product = require('../controller/product')
const category = require('../controller/category')
const users = require('../controller/users')
const router = express.Router()

router
    // PRODUCT
    .get('/product/getAll', product.getAll)
    .post('/product/insert', product.insert)
    .patch('/product/update/:product_id', product.update)
    .delete('/product/deleted/:product_id', product.deleted)
    .get('/product/detail/:product_id', product.detail)
    // CATEGORY
    .get('/category/getAll', category.getAll)
    .post('/category/insert', category.insert)
    .delete('/category/deleted/:category_id', category.deleted)
    // USERS
    .post('/users/register', users.register)
    // .get('/activation/:token', users.verify)
    .post('/users/login', users.login)

module.exports = router