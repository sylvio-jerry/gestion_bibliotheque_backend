const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
require('dotenv').config()
const { validate } = require('../../requests/authRequest')
const { sendError, sendResponse } = require('../baseController')
const { PrismaClient } = require('@prisma/client')
const { users } = new PrismaClient()

module.exports = {
    register: async (req, res, next) => {
        // Request validation 
        const { error } = validate(req.body)
        if(error) sendError(res, error.details[0].message)

        const { fullname, pseudo, password } = req.body

        if(!fullname || !pseudo || !password) sendError(res, "Fill the required fields")
        
        // Check if the user already exists 
        const user = await users.findFirst({
            where: { pseudo }
        })
        if(user) sendError(res, "User already exists")

        // Hash password 
        const hash = await bcrypt.hash(password, 10)

        // Create new user 
        try {
            const newUser = await users.create({
                data: {
                    fullname,
                    pseudo, 
                    password: hash
                }
            })
            
            delete newUser.password 
            sendResponse(res, newUser, "User created successfully")

        } catch (error) {
            sendError(res, error)
        }
    }, 

    login: async(req, res, next) => {
        // Request validation 
        const { error } = validate(req.body)
        if(error) sendResponse(res, null, error.details[0].message)

        const { pseudo, password } = req.body
        if(!pseudo || !password) sendResponse(res, null, "Fill the required fields")

        // Check if the pseudo exists 
        const user = await users.findFirst({
            where: { pseudo }
        })
        if(!user) sendResponse(res, null, "User does not exist")

        // Check if the password correct 
        bcrypt.compare(password, user.password, async (err, result) => {
            if(err) sendError(res, new Error(err))

            if(result){
                // Create and assign token 
                const access_token = jwt.sign(
                    {username: user.pseudo}, 
                    process.env.ACCESS_TOKEN, 
                    { expiresIn: "1d" }
                )
                
                // Set cookie 
                res.cookie('auth_token', access_token, {
                    httpOnly: true, 
                    sameSite: 'None', 
                    secure: true,
                    maxAge: 24 * 60 * 60 * 1000 
                })

                sendResponse(res, access_token ,"User logged in successfully")
            } else {
                sendResponse(res, null,"Invalid password")
            }
        }) 
    }, 

    logout: async (req, res, next) => {
        // Check cookies 
        const cookies = req.cookies
        if(!cookies?.auth_token) return res.sendStatus(204)
        const token = cookies.auth_token

        // Clear cookie 
        res.clearCookie('auth_token', { httpOnly: true, sameSite: 'None', secure: true })
        
        // Send response 
        sendResponse(res, null, "User logged out successfully")
    }, 

    update: async (req, res, next) => {
        // Validate request 
        const { error } = validate(req.body)
        if(error) sendError(res, error.details[0].message)

        const { fullname, pseudo, password } = req.body
        // Check fullname and pseudo 
        const user = await users.findFirst({
            where: { fullname, pseudo }
        })

        if(!user) sendResponse(res, null, "User does not exist")
        
        // Hash password 
        const hash = await bcrypt.hash(password, 10)

        // Update password 
        const updatedUser = await users.update({
            where: { id: +user.id }, 
            data: {
                password: hash
            }
        })
        // exclude password from the response 
        delete updatedUser.password 
        // send response 
        sendResponse(res, updatedUser, "Password updated successfully")
    }
}

