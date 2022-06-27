const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
require('dotenv').config()
const { validate } = require('../../requests/authRequest')
const { sendError, sendResponse } = require('../baseController')
const { PrismaClient } = require('@prisma/client')
const { utilisateurs, bibliothecaires } = new PrismaClient()

module.exports = {
    register: async (req, res, next) => {
        // Request validation 
        const { error } = validate(req.body)
        if(error) sendError(res, error.details[0].message)

        // Check if the user already exists 
        const { im, pseudo } = req.body
        const user = await bibliothecaires.findFirst({
            where: {
                im, 
                utilisateurs: {
                    pseudo
                }
            }
        })
        if(user) sendError(res, "User already exists")

        // Hash password 
        const hash = await bcrypt.hash(req.body.password, 10)

        // Create new user 
        const newUser = await 
        sendResponse(res, null, "ok")
    }
}

