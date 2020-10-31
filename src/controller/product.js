const model = require('../model/product')
const upload = require('../helper/upload')
const fs = require('fs')
const { Success, Failed } = require('../helper/response')

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
                    Success(res, result, "Success Get All Data")
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
                    if (err.code === 'LIMIT_FILE_SIZE') {
                        Failed(res, [], 'Large Image')
                    } else {
                        Failed(res, [], err)
                    }
                } else {
                    const body = req.body
                    body.image = !req.file ? 'default.png' : req.file.filename
                    model.insert(body)
                        .then((result) => {
                            Success(res, result, 'Success Insert Data')
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
        upload.single('image')(req, res, (err) => {
            if (err) {
                if (err.code === 'LIMIT_FILE_SIZE') {
                    Failed(res, [], 'Large Image')
                } else {
                    Failed(res, [], err)
                }
            } else {
                const id = req.params.product_id
                const body = req.body
                model.check(id)
                    .then((result) => {
                        const Oldimage = result[0].image
                        body.image = !req.file ? Oldimage : req.file.filename
                        if (body.image !== Oldimage) { // Jika imagenya bukan gambar lama
                            if (Oldimage !== 'default.png') { // Jika Gambar lama bukan default
                                fs.unlink(`src/upload/${Oldimage}`, (err) => {
                                    if (err) {
                                        console.log(err)
                                    } else {
                                        model.update(body, id)
                                            .then((result) => {
                                                Success(res, result, 'Success Update Image')
                                            })
                                            .catch((err) => {
                                                console.log(err)
                                            })
                                    }
                                })
                            } else {
                                model.update(body, id)
                                    .then((result) => {
                                        Success(res, result, 'Success Update Image')
                                    })
                                    .catch((err) => {
                                        console.log(err)
                                    })
                            }
                        } else {
                            model.update(body, id)
                                .then((result) => {
                                    Success(res, result, 'Success Update Image')
                                })
                                .catch((err) => {
                                    console.log(err)
                                })
                        }
                    })
            }
        })
    },
    deleted: (req, res) => {
        const id = req.params.product_id
        model.deleted(id)
            .then((result) => {
                Success(res, result, 'Success Delete Data')
            })
            .catch((err) => {
                console.log(err)
            })
    },
    detail: (req, res) => {
        const id = req.params.product_id
        model.detail(id)
            .then((result) => {
                Success(res, result, 'Success Get Detail Data')
            })
            .catch((err) => {
                console.log(err)
            })
    }
}

module.exports = controllerProduct