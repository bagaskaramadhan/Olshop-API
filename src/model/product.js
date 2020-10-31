const db = require('../configs/db')

const modelProduct = {
    getAll: (name, limit, offset, field, order) => {
        return new Promise((resolve, reject) => {
            db.query(`SELECT 
            product.product_id, product.product_name, product.product_category, product.description, 
            product.stock, product.price, product.image, category.category_name
            FROM product INNER JOIN category
            ON category.category_id = product.product_category
            WHERE product_name LIKE '%${name}%'
            ORDER BY ${field} ${order}
            LIMIT ${offset},${limit}`, (err, result) => {
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
            (product_name, product_category, description, stock, price, image) VALUES
            ('${data.product_name}',${data.product_category},
            '${data.description}', ${data.stock},
            '${data.price}', '${data.image}')`, (err, result) => {
                if (err) {
                    reject(new Error(err))
                } else {
                    resolve(result)
                }
            })
        })
    },
    update: (data, id) => {
        return new Promise((resolve, reject) => {
            db.query(`UPDATE product SET ? WHERE product_id = ?`, [data, id], (err, result) => {
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
    },
    detail: (id) => {
        return new Promise((resolve, reject) => {
            db.query(`SELECT product.product_id, product.product_name, category.category_name, product.description, product.stock, product.price, product.image
            FROM product INNER JOIN category
            ON product.product_category = category.category_id
            WHERE product_id = ?`, id, (err, result) => {
                if (err) {
                    reject(new Error(err))
                } else {
                    resolve(result)
                }
            })
        })
    },
    check: (id) => {
        return new Promise((resolve, reject) => {
            db.query(`SELECT * FROM product WHERE product_id = ?`, id, (err, result) => {
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