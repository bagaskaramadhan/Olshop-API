const multer = require('multer')

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, `src/upload`)
    },
    filename: (req, file, callback) => {
        callback(null, `${file.fieldname}-${Date.now()}.png`)
    }
})

const upload = multer({
    storage,
    limits: {fileSize: 2000000}, // 2mb
    fileFilter(req, file, callback) {
        if (file.originalname.match(/\.(jpg|jpeg|png)\b/)) {
            callback(null, true)
        } else {
            callback(`Wrong image type`, null)
        }
    }
})

module.exports = upload