const mongoose = require('mongoose');
const { Schema } = mongoose;

// const commentsSchema = new Schema({
//   userId:{
//     type: Schema.Types.ObjectId,
//     ref:'User'
//   },
//   comment:{
//     type:String,
//     required: true
//   },
//   time:{
//     type: Date,
//     default: Date.now
//   }
// })

const PostSchema = new Schema({
  userId:{
    type:String,
    required:true
  },
  content:{
    type:String,
    max:500
  },
  image:{
    type:String,
  },
  likes:{
    type:Array,
    default:[]
  }
},
{ timestamps: true }
);

module.exports = mongoose.model("Post", PostSchema);
