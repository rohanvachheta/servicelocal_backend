var mongoose = require('mongoose');

var PaymentSchema = mongoose.Schema( {
  
  location: {type: String,required: true,minlength: 1 },

  User_id:{ type: mongoose.Schema.ObjectId, ref:"User"},

  service_provider:{ type: mongoose.Schema.ObjectId, ref:"service"},

  status: { type: Boolean , required: true},

  created_at  : { type: Date, required: true, default: Date.now },

  paymentmoney: { type: Number ,require :true ,minlength: 1, maxlength: 5}
  
});

var payment = mongoose.model('payment', PaymentSchema);


module.exports = {payment};
