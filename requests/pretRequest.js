const joi = require('@hapi/joi');

module.exports = {
    validate: (data) => {
        const schema = joi.object({
            id: joi.number(),
            num_pret: joi.string().required(),
            date_pret: joi.date().required(),
            date_retour: joi.date(), 
            lecteur_id: joi.number(), 
            livre_id: joi.number() 
        })

        return schema.validate(data)
    }
}