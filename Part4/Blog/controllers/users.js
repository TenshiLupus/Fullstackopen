const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (request, response) => {
    const users = await User.find({})
    response.status(201).json(users)
})

usersRouter.post('/', async (request, response) => {
    const {username, name, password} = request.body

    if(password === undefined|| password.length < 3){
        return response.status(400).json({
            error: 'invalid password'
        })
    }

    const saltRounds = 10

    //The hashed password must have been retrieved from and external server
    const passwordHash = await bcrypt.hash(password, saltRounds)

    const user = new User({
        username,
        name,
        passwordHash,
    })

    //User must been saved
    savedUser = await user.save()

    response.status(201).json(savedUser)
})

module.exports = usersRouter