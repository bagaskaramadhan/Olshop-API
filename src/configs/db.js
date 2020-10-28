const db = require('mysql2')
const { HOST, USER, PASSWORD, DATABASE } = require('../helper/env')
const connection = db.createConnection({
    host: HOST,
    user: USER,
    password: PASSWORD,
    database: DATABASE
})

connection.connect((err) => {
    if (err) {
        console.log(`CANNOT CONNECT TO ${DATABASE}`)
    } else {
        console.log(`CONNECTED ON ${DATABASE}`)
    }
})

module.exports = connection