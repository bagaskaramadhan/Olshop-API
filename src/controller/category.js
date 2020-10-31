const model = require('../model/category')

const controllerCategory = ({
    getAll: (req, res) => {
        const id = req.params.product_id
        model.getAll(id)
        .then((result) => {
            res.json(result)
        })
        .catch((err) => {
            console.log(err)
        })
    },
    insert: (req, res) => {
        const body = req.body
        model.insert(body)
        .then((result) => {
            res.json(result)
        })
        .catch((err) => {
            console.log(err)
        })
    },
    deleted: (req, res) => {
        const id = req.params.category_id
        model.deleted(id)
        .then((result) => {
            res.json(result)
        })
        .catch((err) => {
            console.log(err)
        })
    }
})

module.exports = controllerCategory