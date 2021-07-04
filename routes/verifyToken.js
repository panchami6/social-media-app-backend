const jwt = require("jsonwebtoken");

const TOKEN_SECRET = process.env['TOKEN_SECRET'];

function authVerify(req,res,next){
  const token = req.headers.authorization;
  if(!token) return res.status(401).send("Access Denied");
  try{
    const verified = jwt.verify(token, TOKEN_SECRET);
    req.user = verified;
    console.log("verified")
    return next();
  } catch(error){
    res.status(400).send("Invalid Token");
  }
}

module.exports = authVerify;