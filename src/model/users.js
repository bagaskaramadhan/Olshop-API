const db = require('../configs/db')

const modelUsers = ({
    register: (data) => {
        return new Promise((resolve, reject) => {
            db.query(`INSERT INTO users SET ?`, data, (err, result) => {
                if (err) {
                    reject(new Error(err))
                } else {
                    resolve(result)
                }
            })
        })
    },
    checkEmail: (data) => {
        return new Promise((resolve, reject) => {
            db.query(`SELECT * FROM users WHERE email = ?`, data, (err, result) => {
                if (err) {
                    reject(new Error(err))
                } else {
                    resolve(result)
                }
            })
        })
    },
    checkUname: (data) => {
        return new Promise((resolve, reject) => {
            db.query(`SELECT * FROM users WHERE username = ?`, data, (err, result) => {
                if (err) {
                    reject(new Error(err))
                } else {
                    resolve(result)
                }
            })
        })
    },
    // activation: (data) => {
    //     return new Promise((resolve, reject) => {
    //         db.query(`UPDATE users SET is_active = 1 WHERE email = ?`, data, (err, result) => {
    //             if (err) {
    //                 reject(new Error(err))
    //             } else {
    //                 resolve(result)
    //             }
    //         })
    //     })
    // },
    login: (data) => {
        return new Promise((resolve, reject) => {
            db.query(`SELECT * FROM users WHERE email = ?`, data.email, (err, result) => {
                if (err) {
                    reject(new Error(err))
                } else {
                    resolve(result)
                }
            })
        })
    },
    uptoken: (token, id) => {
        return new Promise((resolve, reject) => {
            db.query(`UPDATE users SET token = ? WHERE id = ?`, [token, id], (err, result) => {
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