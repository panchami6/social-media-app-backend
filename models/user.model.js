const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
  userId:{
    type: Schema.Types.ObjectId,
  },
  name:{
    type:String,
    requires:true,
  },
  username:{
    type:String,
    required:true,
    min:3,
    max:20,
    unique:true,
  },
  email:{
    type:String,
    requires:true,
    max:50,
    unique: true,
  },
  password:{
    type: String,
    required: true,
    min:6
  },
  avatar:{
    type:String,
    default: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcREQBHkUsoibI7olceBLnM1-029HkwxJLxmjQ&usqp=CAU"
  },
  coverPicture:{
    type:String,
    default:""
  },
  followers:{
    type: Array,
    default:[]
  },
  following:{
    type: Array,
    default:[]
  },
  isAdmin:{
    type: Boolean,
    default: false,
  },
  from: {
    type: String,
    max:50,
  },
  relationship:{
    type: Number,
    enum: [1, 2, 3]
  },
  bio:{
    type:String,
    default:""
  },
},
{timestamps:true}
);

const User = mongoose.model("User", UserSchema);

module.exports = {User};