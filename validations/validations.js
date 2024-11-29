const { Joi } = require("express-validation")


module.exports = {
    userCreate: {
        body: Joi.object({
            name: Joi.string().required()
        })
    },
    bookCreate: {
        body: Joi.object({
            name: Joi.string().required()
        })
    },
}