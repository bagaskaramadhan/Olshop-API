const model = require('../model/users')
const { Success } = require('../helper/response')
const bcrypt = require('bcrypt')

const controllerUsers = ({
    register: async (req, res) => {
        try {
            const body = req.body
            if (!body.email || !body.username || !body.password) {
                console.log('Cannot be empty!')
            } else {
                const salt = await bcrypt.genSalt(10)
                const hashPass = await bcrypt.hash(body.password, salt)
                const data = {
                    email: body.email.toLowerCase(),
                    password: hashPass,
                    username: body.username,
                    fullname: body.username
                }
                model.register(data)
                .then((result) => {
                    Success(res, result, 'Success Register Data')
                })
                .catch((err) => {
                    console.log(err.message)
                })
            }
        } catch (err) {
            console.log(err.message)
        }
    }
})

module.exports = controllerUsers