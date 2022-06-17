const { PrismaClient } = require('@prisma/client')
const { prets, livres, lecteurs } = new PrismaClient()
const { sendResponse } = require('./baseController')

module.exports = {
    getAll: async (req, res, next) => {
       try {
           const allPrets = await prets.findMany({
               include: { livres: true, lecteurs: true }
           })

           sendResponse(res, allPrets, "Liste des prets")

       } catch (error) {
           next(error)
       }
    }, 

    getById: async(req, res, next) => {
        try {
            const { id } = req.params
            const pret = await prets.findFirst({
                where: { id: parseInt(id) }, 
                include: { lecteurs:true, livres:true }
            })

            sendResponse(res, pret, "Infor sur le pret")

        } catch (error) {
            next(error)
        }
    }, 

    store: async (req, res, next) => {
        try {
            const newPret = await prets.create({
                data: req.body
            })

            sendResponse(res, newPret, "Ajout avec succès")
            
        } catch (error) {
            next(error)
        }
    }, 

    update: async (req, res, next) => {

    }, 

    delete: async (req, res, next) => {

    }

}