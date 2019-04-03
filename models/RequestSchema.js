var mongoose = require('mongoose');

var RequestServiceSchema = mongoose.Schema({

  show: {type:Boolean, default:false, required: true},
 
  User_id:{ type: mongoose.Schema.ObjectId, ref:"User"},

  service_provider:{ type: mongoose.Schema.ObjectId, ref:"serviceprovider"},

  name: {type: String ,require: true},

  address:{type : String ,require: true},

  email: {type:String , require: true},

  Mobile: {type: String ,require:true},

  vehicleNumber: {type: String , require: true},

  vehiclesesrvicename:{ type : String ,require: true},

  serviceExpectedDate: {type:String ,require:true},

  serviceExpectedTime: {type:String ,require:true},
  

  created_at  : { type: Date, required: true, default: Date.now },

  // towing:[{ type: mongoose.Schema.ObjectId, ref:"towing"}],

  // review: { type: Number , minlength: 1 ,maxlength: 5}
  
  
});


var request = mongoose.model('requestService', RequestServiceSchema);

module.exports = {request};
