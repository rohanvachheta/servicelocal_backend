var mongoose = require('mongoose');

var Todo = mongoose.model('Todo', {
  lat: {
    required:true,
    type: String,
    minlength: 1
  },
  lng: {
    type: String,
    minlength: 1
  },
  title: {
    type: String,
    minlength: 1
  },
  description: {
    type: String,
    minlength: 1
  },
 
});

module.exports = {Todo};
