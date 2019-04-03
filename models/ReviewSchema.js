var mongoose = require('mongoose');

var ReviewSchema = mongoose.Schema( {
 
  User_id:{ type: mongoose.Schema.ObjectId, ref:"User"},

  service_provider:{ type: mongoose.Schema.ObjectId, ref:"serviceprovider"},

  created_at  : { type: Date, required: true, default: Date.now },

  towing:{ type: mongoose.Schema.ObjectId, ref:"towing"},

  payment: { type: mongoose.Schema.ObjectId, ref:"payment"},

  review: { type: Number , minlength: 1 ,maxlength: 5},

  
  
});

var review = mongoose.model('review', ReviewSchema);


module.exports = {review};
