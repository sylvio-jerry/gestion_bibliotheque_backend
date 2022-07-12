const joi = require('@hapi/joi')
module.exports = {
    validate: (data) => {
        const schema = joi.object({
            id: joi.number(),
            num_lecteur: joi.string().required(),
            nom_lecteur: joi.string().required(),
            prenom_lecteur: joi.string().required(),
            adresse_lecteur: joi.string().required(),
            telephone: joi.string().required()
           
        })

        return schema.validate(data)
    }
}