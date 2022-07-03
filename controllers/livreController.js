const { PrismaClient } = require('@prisma/client')
const { livres, ouvrages } = new PrismaClient()
const { validate } = require('../requests/livreRequest')
const { sendResponse } = require('./baseController')
const dayjs = require('dayjs')

const new_num_livre = async (req, res,next)=>{
    const last_livre=await livres.findFirst({
        take:-1
    })
    new_id_livre=last_livre.id+1
    const num_livre='LIV-'+new_id_livre
    return num_livre;
}

module.exports={
    getAll: async (req, res, next) => {
        try {
            const allLivres = await livres.findMany({
                include: { ouvrages: true }
            })
            sendResponse(res, allLivres, "Liste des livres")
 
        } catch (error) {
            next(error)
        }
     }, 
 
     getById: async(req, res, next) => {
         try {
             const { id } = req.params
             const livre = await livres.findFirst({
                 where: { id: parseInt(id) }, 
                 include: { ouvrages:true }
             })
 
             sendResponse(res, livre, "Information sur le livre")
 
         } catch (error) {
             next(error)
         }
     }, 
 
     store: async (req, res, next) => {
        try {
            // Validate request 
           const { error } = validate(req.body)
            if(error) return res.json({ message: error.details[0].message })
           
            //Destructuring the body
            const {titre,auteur,date_edition,disponible}=req.body;

            //get a new numero livre
            const num_livre=await new_num_livre()
            
            //create new livre
             const newLivre = await livres.create({
                data: {
                    disponible,num_livre,
                    ouvrages:{
                     create:{
                        titre,
                        auteur,
                        date_edition:dayjs(date_edition).toDate(),
                     }
                    }
                }
              })

              return sendResponse(res, newLivre, "Ajout avec succes")
            
        } catch (error) {
            next(error)
        }
    }, 
 
     update: async (req, res, next) => {
        const { id } = req.params
        try {
           const {titre,auteur,date_edition,disponible}=req.body;

           const updatedLivre =  await livres.update({
               where: { id: +id },
               data:{
                disponible: disponible,
                ouvrages:{
                    update:{
                        titre,
                        auteur,
                        date_edition: dayjs(date_edition).toDate()
                    }
                }
               }
           })

           return sendResponse(res, updatedLivre, "Update avec succes")
        } catch (error) {
            next(error)
        }
    }, 
 
     delete: async (req, res, next) => {
        //delete ouvrages and the livre will be deleted automaticly (grace to foreign key constraint)
         const { id } = req.params 

        // get livre to delete and select ouvrage_id
        const livre = await livres.findFirst({
            where: { id: +id }, // convert id to number <===> parseInt(id), Number(id)
            select: { ouvrage_id: true }
        })
         // Delete  record 
         try {
             const deletedData = await ouvrages.delete({
                 where: { id: livre.ouvrage_id }
             })
             return sendResponse(res, deletedData, "Suppression avec succès")
 
         } catch (error) {
             next(error)
         }
     },
     deleteChecked: async (req, res, next) => {
        //delete ouvrages and the livre will be deleted automaticly (grace to foreign key constraint)
        const { arrayLivreId } = req.body
        // get livre to delete and select ouvrage_id
        const livreSelected = await livres.findMany({
            where: { id: {in : arrayLivreId} },
            select: { ouvrage_id: true }
        })
        var arrayOuvrageId=[]

        livreSelected.map((livre)=>{
            arrayOuvrageId.push(livre.ouvrage_id)
        })
         // Delete  record 
         try {
             const deletedDataCount = await ouvrages.deleteMany({
                 where: { 
                        id : { in : arrayOuvrageId }
                    }
             })
        return sendResponse(res, deletedDataCount, "Suppression avec succès")
 
         } catch (error) {
             next(error)
         }
     }
}