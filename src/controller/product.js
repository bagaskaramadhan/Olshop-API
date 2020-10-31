const model = require('../model/product')
const upload = require('../helper/upload')

const controllerProduct = {
    getAll: (req, res) => {
        try {
            const field = !req.query.field ? "product_id" : req.query.field
            const order = !req.query.order ? 'ASC' : req.query.order
            const name = !req.query.name ? "" : req.query.name
            const limit = !req.query.limit ? 5 : parseInt(req.query.limit)
            const page = !req.query.page ? 1 : parseInt(req.query.page)
            const offset = page === 1 ? 0 : (page - 1) * limit
            model.getAll(name, limit, offset, field, order)
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
            upload.single('image')(req, res, (err) => {
                if (err) {
                    console.log(err)
                } else {
                    const body = req.body
                    body.image = !req.file ? 'default.png' : req.file.filename
                    model.insert(body)
                        .then((result) => {
                            res.json(result)
                        })
                        .catch((err) => {
                            console.log(err)
                        })
                }
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
    },
    detail: (req, res) => {
        const id = req.params.product_id
        model.detail(id)
        .then((result) => {
            res.json(result)
        })
        .catch((err) => {
            console.log(err)
        })
    }
}

module.exports = controllerProduct