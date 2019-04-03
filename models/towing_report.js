var mongoose = require('mongoose');

var towinga = mongoose.Schema( {
 
  User_id:[{ type: mongoose.Schema.ObjectId, ref:"User"}],

  service_provider:[{ type: mongoose.Schema.ObjectId, ref:"service"}],

  created_at  : { type: Date, required: true, default: Date.now },

  review: { type: Number , minlength: 1 ,maxlength: 5},

  expected: { type : Date , require : true, default :new Date().getTime() + 60 * 60 * 24 * 1000},

  address: {type: String , required: true},

  location: {type: String ,required: true , default: "ahmedabad"}

  
  
});


var towing = mongoose.model('towing', towinga);

module.exports = {towing};
