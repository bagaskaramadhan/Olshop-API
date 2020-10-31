const db = require('../configs/db')

const modelProduct = {
    getAll: () => {
        return new Promise((resolve,reject) => {
            db.query(`SELECT * FROM product`, (err, result) => {
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
            db.query(`INSERT INTO product 
            (product_name, product_type, description, stock, price, image) VALUES
            ('${data.product_name}','${data.product_type}','${data.description}', ${data.stock}, '${data.price}', '${data.image}')`, (err,result) => {
                if (err) {
                    reject(new Error(err))
                } else {
                    resolve(result)
                }
            })
        })
    },
    update: (data, id) => {
        return new Promise((resolve,reject) => {
            db.query(`UPDATE product SET ? WHERE product_id = ?`, [data, id], (err,result) =>{
                if (err) {
                    reject(err)
                } else {
                    resolve(result)
                }
            })
        })
    },
    deleted: (id) => {
        return new Promise((resolve, reject) => {
            db.query(`DELETE FROM product WHERE product_id = ?`, id, (err, result) => {
                if (err) {
                    reject(new Error(err))
                } else {
                    resolve(result)
                }
            })
        })
    }
}

module.exports = modelProduct