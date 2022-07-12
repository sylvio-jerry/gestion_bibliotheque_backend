const joi = require('@hapi/joi');

module.exports = {
   
    validate: (data) => {
        const schema = joi.object({
            id: joi.number(),
            livre_id: joi.number(),
            date_cons: joi.date(),
            heure_debut: joi.any(), 
            heur_fin: joi.any()
       
        })

        return schema.validate(data)
    }
}
