const express = require("express");
const router = express.Router();
const Post = require("../models/posts.model");
const { User } = require("../models/user.model");
const authVerify = require("./verifyToken");
//create a post

router.route("/")
.post(authVerify, async (req,res) =>{
  const newPost = new Post(req.body);
  try{
    const savedPost = await newPost.save();
    res.status(200).json({success:true, savedPost})
  } catch(err){
    res.status(500).json(err)
  }
})

//delete a post

router.route("/:id")
.delete(authVerify, async (req,res) =>{
  try{
  const post = await Post.findById(req.params.id);
  if(post.userId === req.body.userId){
    await post.deleteOne();
    res.status(200).json("Post has been deleted")
  } else{
    res.status(403).json("You can delete only your post");
  }
  } catch(err){
    res.status(500).json(err);
  }
})
//like a post

router.post("/:id/like", authVerify, async (req, res) => {
  try{
  const post = await Post.findById(req.params.id)
  if(!post.likes.includes(req.body.userId)){
    await post.updateOne({$push: {likes: req.body.userId}});
    res.status(200).json("The post has been liked")
  }else{
    await post.updateOne({ $pull : {likes: req.body.userId}});
    res.status(200).json("The post like has been removed");
  }
  } catch(err){
    console.log(err)
    res.status(500).json(err)
  }
})
//get a post

router.get("/:id", authVerify, async (req,res) => {
  try{
    const post = await Post.findById(req.params.id);
    res.status(200).json(post);
  } catch(err){
    res.status(500).json(err)
  }
})
//get timeline posts

router.get("/timeline/all", authVerify, async(req,res) => {
  let postArray = [];
  try{
    const currentUser = await User.findById(req.body.userId);
    const userPosts = await Post.find({userId: currentUser._id})
    const friendsPosts = await Promise.all(
      currentUser.following.map(friendId => {
        return Post.find({userId: friendId})
      })
    );
    res.json(userPosts.concat(...friendsPosts))
  } catch(err){
    console.log(err)
    res.status(500).json(err)
  }
})


module.exports = router;