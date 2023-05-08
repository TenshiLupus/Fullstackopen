const config = require('./utils/config')
const express = require('express')
const cors = require('cors')
const app = express()
const blogsRouter = require('./controllers/blogs')
const logger = require('./utils/logger')
const mongoose = require('mongoose')

mongoose.connect(config.MONGODB_URI)
.then(() => {
    logger.info('connected to MongoDB')
})
.catch((error) => {
    logger.error('error connecting to MongoDB:', error.message)
})

app.use(cors())
app.use(express.json())
//Make sure to separate the resource from the host domain, else it'll be interpreted as domain + URL and not Domain/URL
app.use('/api/blogs', blogsRouter)
app.use(blogsRouter)

module.exports = app