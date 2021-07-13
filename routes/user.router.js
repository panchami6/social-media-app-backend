const express = require("express");
const router = express.Router();
const { User } = require("../models/user.model");
const bcrypt = require("bcrypt");
const authVerify = require("./verifyToken")


router.get("/", authVerify, async(req, res) => {
  try{
  const users = await User.find({})
  res.json({success:true, users})
  } catch(err){
    console.log(err)
  }
})

router.get("/suggestion/:id", authVerify, async(req,res) => {
  try{
    const users = await User.find({})
    const suggestedUsers = users.filter(user => !user.followers.includes(req.params.id) && user._id != req.params.id
)
    res.json({success: true, suggestedUsers})
    console.log(suggestedUsers);
  } catch(err){
    console.log(err)
  }
})

//update user
router.route("/:id")
.post(authVerify, async(req, res) => {
  if(req.body.userId === req.params.id || req.body.isAdmin) {
    if(req.body.password) {
      try{
      const salt = await bcrypt.genSalt(10);
      req.body.password = await bcrypt.hash(req.body.password, salt);
    } catch(err){
      return res.status(500).json(err)
    }
    }
    try{
      const user = await User.findByIdAndUpdate(req.params.id, {
        $set: req.body,
      });
      res.status(200).json({success:true, message: "Account has been updated successfully", user})
    }catch(err){
      console.log(err)
      res.status(500).json(err);
    } 
    } else{
      return res.status(403).json("You can only update your account!");
    }
  
})

//delete user

.delete(authVerify, async(req, res) => {
  if(req.body.userId === req.params.id || req.body.isAdmin) {
    try{
      await User.deleteOne({_id: req.params.id});
      res.status(200).json("Account has been deleted successfully");
    }catch(err){
      console.log(err)
      res.status(500).json(err);
    } 
    } else{
      return res.status(403).json("You can only delete your account!");
    }
})
//get a user

.get(authVerify, async(req, res) => {
  try{
    const user = await User.findById(req.params.id);
    console.log(user)
    const {password, updatedAt, createdAt, __v, ...others } = user._doc;
    res.status(200).json({success: true, others})
  } catch(err){
    console.log(err)
    res.status(500).json(err)
  }
})

//follow a user
router.route("/:id/follow")
.post(authVerify, async (req, res) => {
  if(req.body.userId !== req.params.id) {
    try{
      const user = await User.findById(req.params.id);
      const currentUser = await User.findById(req.body.userId);
      if(!user.followers.includes(req.body.userId)){
        await user.updateOne({ $push: {followers: req.body.userId}});
        await currentUser.updateOne({$push: {following : req.params.id}});
        res.status(200).json("User has been followed");
      } else{
        res.status(403).json("You already follow this user");
      }
    } catch(err){
      console.log(err)
      res.status(500).json(err);
    }
  } else{
    res.status(403).json("You cannot follow yourself")
  }
})
//unfollow a user

router.route("/:id/unfollow")
.post(authVerify, async (req, res) => {
  if(req.body.userId !== req.params.id) {
    try{
      const user = await User.findById(req.params.id);
      const currentUser = await User.findById(req.body.userId);
      if(user.followers.includes(req.body.userId)){
        await user.updateOne({ $pull: {followers:req.body.userId }});
        await currentUser.updateOne({$pull: {following : req.params.id}});
        res.status(200).json("User has been unfollowed");
      } else{
        res.status(403).json("You don't follow this user");
      }
    } catch(err){
      console.log(err)
      res.status(500).json(err);
    }
  } else{
    res.status(403).json("You cannot unfollow yourself")
  }
})

router.get("/", (req, res) => {
  
})

module.exports = router;