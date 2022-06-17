const joi = require('@hapi/joi')

module.exports = {
    validate: (data) => {
        const schema = joi.object({
            
        })

        return schema.validate(data)
    }   
}