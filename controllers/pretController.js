const { PrismaClient } = require('@prisma/client')
const { prets, livres, lecteurs } = new PrismaClient()
const { validate } = require('../requests/pretRequest')
const { sendResponse } = require('./baseController')
const dayjs = require('dayjs')

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
            // Define constant 
            const MAX_PRET = 3
            const { livre_id, lecteur_id } = req.body

            // Validate request 
            const { error } = validate(req.body)
            if(error) return res.json({ message: error.details[0].message })
            
            // check user max books borrow, if max > 3 => cannot add new
            const nbpret = await prets.count({
                where: { lecteur_id, date_retour: null }
            })
            if(nbpret > MAX_PRET + 1) return sendResponse(res, nbpret, "Nombre maximum de prêts: 3 par lecteur")

            // check if the book already exist in the list 
            const bookBorrowed = await prets.findFirst({
                where: { livre_id, date_retour: null }
            })
            if(bookBorrowed) return sendResponse(res, bookBorrowed, "Ce livre n'est pas disponible pour le moment")

            req.body.date_pret = dayjs(req.body.date_pret).toDate()
            const newPret = await prets.create({
                data: req.body
            })

            return sendResponse(res, newPret, "Ajout avec succès")
            
        } catch (error) {
            next(error)
        }
    }, 

    update: async (req, res, next) => {
        const { date_retour } = req.body
        const { id } = req.params

        // get date record
        const pret = await prets.findFirst({
            where: { id: +id }, // convert id to number <===> parseInt(id), Number(id)
            select: { date_pret: true }
        })

        // check due date
        const due_date = dayjs(pret.date_pret).add(7, 'day')
        const retour = dayjs(date_retour).toDate()

        // compare due date and date_retour 
        if(due_date.diff(retour) < 0) return sendResponse(res, null, "Ce livre devait être retourné avant le " + due_date.toDate() + ". Vous devez payer 5000Ar")

        // update record
        try {
            const updatedData = await prets.update({
                where: { id: +id },
                data: { date_retour: dayjs(date_retour).add(1, 'day').toDate() }
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
            const deletedData = await prets.delete({
                where: { id: +id }
            })
            return sendResponse(res, deletedData, "Suppression avec succès")

        } catch (error) {
            next(error)
        }
    }

}