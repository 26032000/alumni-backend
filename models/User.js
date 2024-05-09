const mongo =require('mongoose');

const UserSchema=mongo.Schema({
  name:{
    type:String,
    required:true
  },
  idno:{
    type:String,
    required:true
  },
  email:{
    type:String,
    required:true
  },
  phone:{
    type:String,
    required:true
  },
  password:{
    type:String,
    required:true
  },
  isadmin:{
    type:Boolean,
    default:false
  },
  image:{
    type:String,
  }
});

const User=mongo.model('User',UserSchema);

module.exports=User;