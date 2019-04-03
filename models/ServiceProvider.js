var mongoose = require('mongoose');

var ServiceSchema = mongoose.Schema({

    name:{
        type:String,
        required: true
    },
 
  Userid:{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
  },

  created_at  : { type: Date, required: true, default: Date.now },

  address: {type:String ,require: true},

  location: {type:String ,require: true},
  
  loc: {
    type: { type: String, require:true }

  }  ,
  services:{type: Array,require: true ,default:[]}
  
});


var serviceprovider = mongoose.model('serviceprovider', ServiceSchema);

ServiceSchema.methods.saveservice= function(){
    var serviceprovider= this;
    serviceprovider.save().then(()=>{
        return serviceprovider;
    })
}

module.exports = {serviceprovider};
