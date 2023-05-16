const Blog = require('../models/blog')
const User = require('../models/user')

const usersInDb = async () => {
    const users = await User.find({})
    return users.map(u => u.toJSON())
}

const randomIndex = collection => Math.floor(Math.random()*collection.length)

module.exports = {
    usersInDb, randomIndex
}