var mongoose = require('mongoose');

var ReportSchema = mongoose.Schema( {
 
  User_id:{ type: mongoose.Schema.ObjectId, ref:"User"},

  service_provider:{ type: mongoose.Schema.ObjectId, ref:"serviceprovider"},

  created_at  : { type: Date, required: true, default: Date.now },

  towing:{ type: mongoose.Schema.ObjectId, ref:"towing"},

  payment: { type: mongoose.Schema.ObjectId, ref:"payment"},

  review: { type: Number , minlength: 1 ,maxlength: 5},

  status : {type:Boolean ,require:true},

  requestid: {type: mongoose.Schema.ObjectId , ref:"requestService"}

  
  
});

var report = mongoose.model('report', ReportSchema);


module.exports = {report};
