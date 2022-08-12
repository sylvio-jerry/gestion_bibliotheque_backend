const { PrismaClient } = require('@prisma/client')
const { adhesions } = new PrismaClient()
const { sendResponse, sendError } = require('./baseController')


module.exports = {
    getAll: async (req, res, next) => {
        try {
            const alladhesions = await adhesions.findMany()
 
            sendResponse(res, alladhesions, "Liste des adhesions")
 
        } catch (error) {
            next(error)
        }
    },

    getById: async(req, res, next) => {
        try {
            const { id } = req.params
            const adhesion = await adhesions.findFirst({
                where: { id: parseInt(id) }, 
                
            })
            sendResponse(res, adhesion, "Infor sur le lecteur adherer")

        } catch (error) {
            next(error)
        }
    }, 

    create: async (req, res, next) => {
            const {droit,annee,lecteur_id} = req.body
            // create record
            try {
                const newAdhesion = await adhesions.create({
                   
                   data : {droit: droit,
                            annee: annee,
                            lecteur_id: lecteur_id
                           },        
                })
            
            return sendResponse(res, newAdhesion, "Ajout avec succès")
            
        } catch (error) {
            next(error)
        }
    }, 

   update: async (req, res, next) => {
        const { id } = req.params
        const {droit,annee} = req.body
       // update record
        try {
            const updatedData = await adhesions.update({
                where: { id: parseInt(id) }, 
                data : { droit: droit,
                         annee: annee
                       },
            })
            return sendResponse(res, updatedData, "Mise à jour avec succès")

        } catch (error) {
            next(error)
        }
    }, 


    delete: async (req, res, next) => {
        const { id } = req.params 

        // Delete  record 
        try {
            const deletedData = await adhesions.delete({
                where: { id: parseInt(id) }, 
            })
            return sendResponse(res, deletedData, "Suppression avec succès")

        } catch (error) {
            next(error)
        }
    }, 

}