module.exports = {
    sendResponse: (res, data, message, status, statusCode=200) => {
        return res.status(statusCode).json({
            "status": status || "success", 
            "message": message || "Un action a été éffectué avec succès",
            "data": data 
        });
    }, 

    sendError: (res, message, status, statusCode=400) => {
        return res.status(statusCode).json({
            "status": status || "failed", 
            "message": message || "Un erreur est survenu lors de l'operation",
            "data": null
        });
    }, 
}