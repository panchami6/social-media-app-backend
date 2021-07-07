const mongoose = require('mongoose');
const { Schema } = mongoose;
const { User } = require("./user.model");

const PostSchema = new Schema({
  userId:{
    type:String,
    required:true
  },
  avatar:{
    type:String,
    required: true,
    ref: User
  },
  name:{
    type:String,
    required: true,
    ref: User
  },
  content:{
    type:String,
    max:500
  },
  image:{
    type:String,
    default:"",
  },
  likes:{
    type:Array,
    default:[]
  }
},
{ timestamps: true }
);

module.exports = mongoose.model("Post", PostSchema);
