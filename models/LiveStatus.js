var mongoose = require('mongoose');

var LiveStatusSchema = mongoose.Schema({

  requestid:{type: mongoose.Schema.ObjectId,required:true , ref:"requestService"},
  
  location: {type: String,required: true,minlength: 1,trim: true },

  User_id:{ type: mongoose.Schema.ObjectId, ref:"User"},

  service_provider:{ type: mongoose.Schema.ObjectId, ref:"service"},

  status: { type: Boolean,default:true , required: true},

  created_at  : { type: Date, required: true, default: Date.now },
  
});

var live = mongoose.model('live', LiveStatusSchema);


module.exports = {live};
