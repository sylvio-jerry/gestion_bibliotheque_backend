const joi = require('@hapi/joi')
module.exports = {
    validate: (data) => {
        const schema = joi.object({
            id: joi.number(),
            droit:joi.number(),
            annee: joi.number(),
            lecteur_id: joi.number()
        })

        return schema.validate(data)
    }
}