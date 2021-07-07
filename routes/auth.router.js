const express = require("express");
const router = express.Router();
const { User } = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {registerValidation, loginValidation} = require("./validation");

router.route("/")
.get( async (req,res) => {
  const user = await User.find();
  res.json({success: true, user})
})

router.route("/register")
.post( async (req,res) => {
    try{
      const {error} = registerValidation(req.body);
      if(error) {
        console.log(error)
        return res.status(400).send(error.details[0].message);
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.password, salt);

      const newUser = new User({
      name:req.body.name,
      username:req.body.username,
      email:req.body.email,
      password:hashedPassword,
    });

      const user= await newUser.save();
      res.status(200).json({user});
    } catch(err){
      console.log(err);
    }
  }
)

router.route("/login")
.post( async (req,res) => {
  try{
  const user = await User.findOne({email:req.body.email});
  if(!user){
    return res.status(404).json("email or password is wrong!")
  }

 if(user){
   console.log(user)
  const validPassword = await bcrypt.compare(req.body.password, user.password)
  !validPassword && res.status(400).json("email or password is wrong!")

  const TOKEN_SECRET = process.env['TOKEN_SECRET'];

  const token = jwt.sign({_id: user._id}, TOKEN_SECRET);
  console.log("logged in")
  res.json({user, token})
 }
  } catch(err){
    console.log(err)
    res.status(500).json(err)
  }
})

module.exports = router;