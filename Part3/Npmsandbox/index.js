const app = require('./app')
const config = require('./utils/config')
const logger = require('./utils/logger')

//A better option to run the tests accross different files is to declare the tests that will be run directly as parameters of the test command line, else a single string that's within the test name can be used to find the test
//esentilally launchs the application on the designated port
app.listen(config.PORT, () => {
	logger.info(`Server running on port ${config.PORT}`)
})

