const model = require('../model/category')
const { Success } = require('../helper/response')

const controllerCategory = ({
    getAll: (req, res) => {
        const id = req.params.product_id
        model.getAll(id)
            .then((result) => {
                Success(res, result, 'Success Get All Data')

            })
            .catch((err) => {
                console.log(err)
            })
    },
    insert: (req, res) => {
        const body = req.body
        model.insert(body)
            .then((result) => {
                Success(res, result, 'Success Insert Data')

            })
            .catch((err) => {
                console.log(err)
            })
    },
    deleted: (req, res) => {
        const id = req.params.category_id
        model.deleted(id)
            .then((result) => {
                Success(res, result, 'Success Delete Data')

            })
            .catch((err) => {
                console.log(err)
            })
    }
})

module.exports = controllerCategory