const joi = require('@hapi/joi')

module.exports = {
    validate: (data) => {
        const schema = joi.object({
            im: joi.string(),
            pseudo: joi.string().alphanum().required(), 
            password: joi.string().min(6).required()
        })

        return schema.validate(data)
    }
}