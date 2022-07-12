var utc = require("dayjs/plugin/utc")
var timezone = require("dayjs/plugin/timezone")
const dayjs = require('dayjs')
dayjs.extend(timezone)
dayjs.extend(utc)
dayjs.tz.setDefault()
const { PrismaClient } = require('@prisma/client')
const { consultations,livres } = new PrismaClient()
const { validate } = require('../requests/consultationRequest')
const { sendResponse } = require('./baseController')




module.exports = {
    getAll: async (req, res, next) => {
       try {
           const allCons = await consultations.findMany({
               include: { livres: true}
           })

           sendResponse(res, allCons, "Liste des consultations")

       } catch (error) {
           next(error)
       }
    }, 
    getById: async(req, res, next) => {
        try {
            const { id } = req.params
            const allCons = await consultations.findFirst({
                where: { id: parseInt(id) }, 
                include: { livres:true }
            })

            sendResponse(res, allCons, "Infor sur la consultation")

        } catch (error) {
            next(error)
        }
    }, 
    
    create: async (req, res, next) => {
        try {
             const {livre_id } = req.body
            
            // Validate request 
             const { error } = validate(req.body)
             if(error) return res.json({ message: error.details[0].message })
            
            // check  if the book is not avaible 
                    const IsbookAvaible = await consultations.findFirst({
                        where: { livre_id, heur_fin: null }
                    })
            if(IsbookAvaible) return sendResponse(res, IsbookAvaible, "Cette livre n'est pas consultable pour le moment!")
         
            
            //create Consultation
            let d3 =dayjs(new Date()).toDate()
            //var now  = dayjs(new Date()).toDate()
           
            const heure= new Date(dayjs().format('YYYY-mm-DD HH:mm:ssZ[Z]'))

            const newCons = await consultations.create({
                data: { livre_id: +livre_id,
                        date_cons:  d3,
                        heure_debut: heure
 
                      }
            })
            

            return sendResponse(res, newCons, "Ajout avec succès")
            
        } catch (error) {
            next(error)
        }
    }, 

    update: async (req, res, next) => {
        const heure= new Date(dayjs().format('YYYY-mm-DD HH:mm:ssZ[Z]'))
        const { id } = req.params

        // get date record
       /* const Cons = await consultations.findFirst({
            where: { id: parseInt(id) },
            select: { heure_debut: true }
        })*/

        // const retour = dayjs(heur_fin).toDate()

        // update record
        try {
            const updatedData = await consultations.update({
                where: { id: parseInt(id) },
                data: { heur_fin: heure }
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
            const deletedData = await consultations.delete({
                where: { id: parseInt(id) }
            })
            return sendResponse(res, deletedData, "Suppression avec succès")

        } catch (error) {
            next(error)
        }
    }, 

}