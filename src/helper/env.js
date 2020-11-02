require('dotenv').config()

module.exports = {
    PORT: process.env.PORT,
    USER: process.env.DB_USER,
    HOST: process.env.DB_HOST,
    PASSWORD: process.env.DB_PASS,
    DATABASE: process.env.DB_NAME,
    HOSTURL: process.env.URLHOST,
    USERMAIL: process.env.MAILUSER,
    USERPASS: process.env.PASSUSER
}