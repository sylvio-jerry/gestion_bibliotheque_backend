const { PrismaClient } = require('@prisma/client')
const { application } = require('express')
const { lecteurs } = new PrismaClient()
const { validate } = require('../requests/lecteurRequest')
const { get } = require('../routes/auth.route')
const { sendResponse, sendError } = require('./baseController')


module.exports = {
   
    getAll: async (req, res, next) => {
        try {
            const allLecteurs = await lecteurs.findMany()
 
            sendResponse(res, allLecteurs, "Liste des lecteurs")
 
        } catch (error) {
            next(error)
        }
    },

    getById: async(req, res, next) => {
        try {
            const { id } = req.params
            const lecteur = await lecteurs.findFirst({
                where: { id: parseInt(id) }, 
                
            })
            sendResponse(res, lecteur, "Infor sur le lecteur")

        } catch (error) {
            next(error)
        }
    }, 

    create: async (req, res, next) => {

        const new_num_lecteur = async(req,res,next)=>{
            const last_lecteur = await lecteurs.findFirst({
                take: -1
            })
            new_id_lecteur= last_lecteur.id+1
            const num_lecteur = 'LC'+new_id_lecteur
            return num_lecteur;
       
         }
            const num_lecteur = await new_num_lecteur()
            const {nom_lecteur,prenom_lecteur,adresse_lecteur,telephone} = req.body
            // create record
            try {
                const newLecteur = await lecteurs.create({
                   
                   data : { num_lecteur: num_lecteur,
                            nom_lecteur: nom_lecteur,
                            prenom_lecteur: prenom_lecteur,
                            adresse_lecteur: adresse_lecteur,
                            telephone:telephone
                           },
                         
                })
            
            return sendResponse(res, newLecteur, "Ajout avec succès")
            
        } catch (error) {
            next(error)
        }
    }, 

   update: async (req, res, next) => {
        const { id } = req.params
        const {nom_lecteur,prenom_lecteur} = req.body
        const {adresse_lecteur,telephone} = req.body

        // update record
        try {
            const updatedData = await lecteurs.update({
                where: { id: parseInt(id) }, 
                
                data : {
                        nom_lecteur: nom_lecteur,
                        prenom_lecteur: prenom_lecteur,
                        adresse_lecteur: adresse_lecteur,
                        telephone: telephone
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
            const deletedData = await lecteurs.delete({
                where: { id: parseInt(id) }, 
            })
            return sendResponse(res, deletedData, "Suppression avec succès")

        } catch (error) {
            next(error)
        }
    }, 

}