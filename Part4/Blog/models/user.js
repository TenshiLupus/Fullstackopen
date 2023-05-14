const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

//Validation and nonexistence are handled in 2 separate ways, within this file, only validation is being handled in this file
//when defining an array as a field of a schema, a squared bracket is used
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'A username must be given for the user to be created'],
    minLength: [3, 'Username, must be a minimum size of 3'],
    unique: [true, 'Username must be unique'],
  },
  name: {
    type: String,
    required: true
  },
  passwordHash: String,
  blogs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Blog'
    }
  ],
})

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    // the passwordHash should not be revealed
    delete returnedObject.passwordHash
  }
})

userSchema.plugin(uniqueValidator)

const User = mongoose.model('User', userSchema)

module.exports = User