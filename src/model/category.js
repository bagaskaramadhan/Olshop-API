const db = require('../configs/db')

const modelCategory = ({
    getAll: () => {
        return new Promise((resolve, reject) => {
            db.query(`SELECT * FROM category`, (err, result) => {
                if (err) {
                    reject(new Error(err))
                } else {
                    resolve(result)
                }
            })
        })
    },
    insert: (data) => {
        return new Promise((resolve, reject) => {
            db.query(`INSERT INTO category (category_name) VALUES
            ('${data.category_name}')`, (err, result) => {
                if (err) {
                    reject(new Error(err))
                } else {
                    resolve(result)
                }
            })
        })
    },
    deleted: (id) => {
        return new Promise((resolve, reject) => {
            db.query(`DELETE FROM category WHERE category_id = ?`, id, (err, result) => {
                if (err) {
                    reject(new Error(err))
                } else {
                    resolve(result)
                }
            })
        })
    }
})

module.exports = modelCategory