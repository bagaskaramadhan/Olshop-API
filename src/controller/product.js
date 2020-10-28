const model = require('../model/product')

const controllerProduct = {
    getAll: (req, res) => {
        try {
            model.getAll()
            .then((result) => {
                res.json( result)
            })
            .catch((err) => {
                console.log(err)
            })
        } catch (error) {
            console.log(error.message)
        }
    }
}

module.exports = controllerProduct