const mongoose = require('mongoose');
const {schema} =mongoose;

const NotificationSchema = new Schema({
  userId:{
    type: Schema.types.ObjectId
  },
  name:{
    type:String,
    requires:true
  },
})

const Notification = mongoose.model("Notification", NotificationSchema);

module.exports = Notification;