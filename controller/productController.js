const product = require("../model/product")
const userModel = require("../model/userModel")
const img = require("../helper")


exports.addProduct = async(req,res)=>{
 
  const {name, price,user_id} = req.body

   console.log(" This is user login requst body",req.body)
  console.log(" this is user file upload body data",req.files.img.data)

   const uploadImageResult = await img.uploadImage(req.files)
  console.log(" our file image upload data ",uploadImageResult[0].url)

 const data = {
    name ,
    price,
    user_id,
    photo: uploadImageResult[0].url
  }
   const abc = new product(data)
   

try {
    
console.log(req.body)

const abc = new product(req.body)
await abc.save()
console.log(abc)
return res.status(200).json({message:" Your Product has been sucesssfully adeed!!!!!!",data})

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