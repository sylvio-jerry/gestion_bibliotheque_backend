const { PrismaClient } = require('@prisma/client')
const { livres,consultations,ouvrages,prets } = new PrismaClient()
const { validate } = require('../requests/consultationRequest')
const { sendResponse } = require('./baseController')


module.exports = {
getAll: async (req, res, next) => {
    try {
        const livre = await livres.findMany({
             include: { consultations: true, ouvrages: true }})
       
        sendResponse(res, livre, "Liste des actions recentes")

    } catch (error) {
        next(error)
    }
},

getNbConsultation:async (req,res,next) => {
    try{
        const { date_cons } = req.params
        const nbCons = await consultations.count({date_cons})

        sendResponse(res, nbCons, "Nombre de consultation")
    } catch (error) {
        next(error)
    }
},

getNbLivBorrowed:async (req,res,next) => {
    try{
        const { date_pret } = req.params
        const nbPret = await prets.count({date_pret})

        sendResponse(res, nbPret, "Nombre de livre preter")
    } catch (error) {
        next(error)
    }
},

getNbLivReturned:async (req,res,next) => {
    try{
        const { date_retour } = req.params
        const nbPret = await prets.count({date_retour})

        sendResponse(res, nbPret, "Nombre de livre retourner")
    } catch (error) {
        next(error)
    }
},

getNbLivre:async (req,res,next) => {
    try{
        const nbLivre = await livres.count()

        sendResponse(res, nbLivre, "Nombre Total de livre disponible")
    } catch (error) {
        next(error)
    }
},

}
