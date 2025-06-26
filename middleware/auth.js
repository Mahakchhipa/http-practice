const JWT = require("jsonwebtoken")
const secretkey = " jshudifhiwufhawelhwia";
const usermodel = require("../model/userModel")

module.exports= async(req,res,next)=>{
    const bearerToken = req.headers.authorization
        console.log(bearerToken,"bearertoken hai bhaiiii......")

if(!bearerToken){
    return res.status(400).send({message:" No token provided"})
}

 const Token = bearerToken.split(" ")[1]
 console.log("token ..............",Token)

 const decode = JWT.verify(Token,secretkey)
 console.log(decode)

 if(!decode){
    return res.status(400).send({ message:" No token provided "})
 }

const email = decode.email
console.log(decode.email,"decode");

const userDetails = await usermodel.findOne({email})

console.log(" User is vaild with token ",userDetails)

if(!userDetails){
    return res.status(400).send({ message:" User not found "})
}
 req.userDetails = userDetails

 next()
}