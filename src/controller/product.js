const model = require('../model/product')

const controllerProduct = {
    getAll: (req, res) => {
        try {
            model.getAll()
            .then((result) => {
                res.json(result)
            })
            .catch((err) => {
                console.log(err)
            })
        } catch (error) {
            console.log(error.message)
        }
    },
    insert: (req, res) => {
        try {
            const body = req.body
            model.insert(body)
            .then((result) => {
                res.json(result)
            })
            .catch((err) => {
                console.log(err)
            })
        } catch (error) {
            console.log(error)
        }
    },
    update: (req, res) => {
        const id = req.params.product_id
        const body = req.body
        model.update(body, id)
        .then((result) => {
            res.json(result)
        })
        .catch((err) => {
            console.log(err)
        })
    },
    deleted: (req, res) => {
        const id = req.params.product_id
        model.deleted(id)
        .then((result) => {
            res.json(result)
        })
        .catch((err) => {
            console.log(err)
        })
    }
}

module.exports = controllerProduct