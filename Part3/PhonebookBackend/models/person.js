/* eslint-disable linebreak-style */
const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

const url = process.env.MONGODB_URI

console.log('connecting to ', url)

// eslint-disable-next-line no-unused-vars
mongoose.connect(url).then(result => {
  console.log('connected to mongoDB')
}).catch(error => {
  console.log('error connecting to MongoDB', error.message)
})

const personSchema = new  mongoose.Schema({
  name: {
    type: String,
    minLength: 3,
    required: true,
  },
  number: {
    type: String,
    minLength: 8,
    validate: {
      validator: (v) => /^\d{2,3}-/.test(v),
      message: props => `${props.value} is not a valid phone number!`
    },
    require: true,
  }
})

personSchema.set('toJSON',{
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Person', personSchema)