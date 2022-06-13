const { PrismaClient } = require('@prisma/client')
const { consultations } = new PrismaClient()

module.exports = {
    getAll: async (req, res, next) => {
        
    },
}