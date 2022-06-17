const joi = require('@hapi/joi')

module.exports = {
    validate: (data) => {
        const schema = joi.object({
            pseudo: joi.string().alphanum().required(), 
            mot_de_passe: joi.string().min(6).required()
        })

        return schema.validate(data)
    }
}