const db = require('../configs/db')

const modelUsers = ({
    register: (data) => {
        return new Promise((resolve, reject) => {
            db.query(`INSERT INTO users (email, username, password) VALUES
            ('${data.email}', '${data.username}', '${data.password}')`, (err, result) => {
                if (err) {
                    reject(new Error(err))
                } else {
                    resolve(result)
                }
            })
        })
    }
})

module.exports = modelUsers