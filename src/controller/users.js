const model = require('../model/users')
const {Success, Failed} = require('../helper/response')


const controllerUsers = ({
    register: (req, res) => {
        const body = req.body
        if (!body.email || !body.username || !body.password) {
            console.log('Cannot be empty!')
        } else {
            model.register(body)
            .then((result) => {
                res.json(result)
            })
            .catch((err) => {
                console.log(err)
            })
        }
    }
})

module.exports = controllerUsers