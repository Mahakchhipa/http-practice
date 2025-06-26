const product = require("../model/product")
const userModel = require("../model/userModel")
// const JWT = require("jsonwebtoken")
// const bcrypt = require("bcrypt")

exports.addProduct = async(req,res)=>{
try {
    
console.log(req.body)

const abc = new product(req.body)
await abc.save()
console.log(abc)
return res.status(200).json({message:" Your Product has been sucesssfully adeed!!!!!!"})

} catch (error) {
     return res.status(404).json({Message:" Product not add "})
}

}

exports.getProducts = async(req,res)=>{
   try {

    const user_id = req.userDetails._id
     console.log(req.body)
     console.log(req.userDetails._id)

     const resultProduct = await product.find({user_id:req.userDetails._id}).populate("user_id")
     console.log(resultProduct ," !!!!!! Populate result---")
    return res.status(202).send({message:" Your All products -----",resultProduct})
   } catch (error) {
     return res.status(404).send({error:error})
   }
}