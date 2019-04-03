const mongoose = require('mongoose');
const validator = require('validator');
const jwt =require('jsonwebtoken');

var UserSchema =mongoose.Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    minlength: 1,
    unique: true,
    validate: {
      validator: validator.isEmail,
      message: '{VALUE} is not a valid email'
    }
  },

  password: {
    type: String,
    require: true,
    minlength: 6
  },

   type: {
    type: String,
    require: true,
    minlength: 2
  },

  services: {
    type: Number,
    require: true,
    default :3
  },
  
  tokens: [{
    access: {
      type: String,
      required: true
    },
    token: {
      type: String,
      required: true
    }
  }]
})
var User = mongoose.model('User',UserSchema);



module.exports = {User}
