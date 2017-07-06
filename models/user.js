const mongoose = require('mongoose')
const Schema = mongoose.Schema
const passportLocalMongoose = require('passport-local-mongoose')

const userSchema = new Schema({
    username: {
        type: String,
        required: [true, 'Username is required'],
    },
    password: String
})

userSchema.plugin(passportLocalMongoose)

userSchema.options.toJSON = {
    getters: true,
    virtuals: true,
    transform: function (doc, ret, options) {
      delete ret._id
      delete ret.__v
      return ret
    }
}

module.exports = mongoose.model('User', userSchema)