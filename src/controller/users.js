const model = require('../model/users')
const { Success, Failed } = require('../helper/response')
const bcrypt = require('bcrypt')
const sendMail = require('../helper/mail')
const JWT = require('jsonwebtoken')
const { JWTVERIFY } = require('../helper/env')

const controllerUsers = {
    register: async (req, res) => {
        const body = req.body
        if (!body.email || !body.password || !body.username) {
            Failed(res, [], 'Cannot empty')
        } else {
            const salt = await bcrypt.genSalt(10)
            const hashPass = await bcrypt.hash(body.password, salt)
            const data = {
                username: body.username,
                email: body.email.toLowerCase(),
                password: hashPass,
                fullname: body.username
            }
            JWT.sign({data: data.email}, JWTVERIFY, async (err, result) => {
                if (err) {
                    Failed(res, [], err.message)
                } else {
                    const email = await model.checkEmail(data.email)
                    const username = await model.checkUname(data.username)
                    if (email.length > 0) {
                        Failed(res, [], 'email registered')
                    } else if (username.length > 0) {
                        Failed(res, [], 'username has been taken')
                    } else {
                        const sendData = {
                            email: data.email,
                            password: data.password,
                            username: data.username,
                            token: result
                        }
                        await model.register(sendData)
                        .then(() => {
                            sendMail(sendData.email, sendData.token)
                            Success(res, sendData, 'check email activation')
                        })
                        .catch((err) => {
                            Failed(res, [], err.message)
                        })
                    }
                }
            })
        }
    },
    login: async (req, res) => {
        const body = req.body
        if (!body.email || !body.password) {
            Failed(res, [], 'cannot empty')
        } else {
            const data = {
                email: body.email.toLowerCase(),
                password: body.password
            }
            await model.login(data)
            .then(async(result) => {
                const results = result[0]
                if (!results) {
                    Failed(res, [], 'email not registered')
                } else {
                    const password = results.password
                    const isMatch = await bcrypt.compare(body.password, password)
                    if (!isMatch) {
                        Failed(res, [], 'wrong password')
                    } else {
                        Success(res, results, 'login success')
                    }
                }
            })
        }
    }
}

module.exports = controllerUsers