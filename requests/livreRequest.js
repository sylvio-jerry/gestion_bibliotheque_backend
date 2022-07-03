const joi = require('@hapi/joi');

module.exports = {
    validate: (data) => {
        const schema = joi.object({
            id: joi.number(),
            num_livre: joi.string(),
            disponible: joi.boolean().required(),
            nb_pret: joi.number(), 
            ouvrage_id: joi.number(), 
            titre: joi.string().required(),
            auteur: joi.string().required(),
            date_edition: joi.date()
        })

        return schema.validate(data)
    }
}
