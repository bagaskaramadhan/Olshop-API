const response = {
    Success: (res, data, message) => {
        const result = {
            message: message,
            success: true,
            code: 200,
            data: data
        }
        res.json(result)
    },
    Failed: (res, data, message) => {
        const result = {
            message: message,
            success: false,
            code: 403,
            data: data
        }
        res.json(result)
    }
}

module.exports = response