const employedata = require("./../model/userModel")

exports.employeSignup = async(req,res)=>{
     try {
      // const {email,password,name,number}= req.body

        const data = req.body;
        console.log(data,"KKKKKK");

        const newUser = new employedata(data);
        await newUser.save();

        return res
          .status(200)
          .json({ message: "User Created Successfully", newUser });
    } catch (error) {
        return res
          .status(400)
          .json({ message:error.message });
    }
}

exports.getalluser = async(req,res)=>{
          try {

           const allresult = await employedata.find()
         return res.status(200).send({message:" This is your all users",allresult})
          } catch (error) {
          return  res.status(404).send({message:error})
          }
}

exports.getsingleuser = async(req,res)=>{
  try {

    const {id}= req.params
    const result = await employedata.findById(id)
    // console.log(result)
    return res.status(202).send({message:" single user is finded " , result})

  } catch (error) {
    return res.status(404).json({message:error})
  }
}

exports.deleteuser = async(req,res)=>{
  try {
    const {id}= req.params
    const dltuser = await employedata.findByIdAndDelete(id)
    console.log(dltuser)
    return res.status(202).send({message:" Your user delete sucessfully",dltuser})

  } catch (error) {
    return res.status(400).json({message:error})
  }
}

exports.updateuser = async(req,res)=>{
  try {
     const {id} = req.params
     const data = req.body
     const updatedata = await employedata.findByIdAndUpdate(id,data ,{new:true})
     console.log( " Your user data updated sucessfully ",updatedata)
     return res.status(200).json({message:" Your user data updated sucessfully",updatedata})
  } catch (error) {
    return res.status(404).send({message:error})
  }
}

exports.userLogin = async(req,res)=>{
  try {
     const { email , password} = req.body
      const alreadyEmail = await User.findOne({email})

    if(!alreadyEmail){
        return res.status(400).json({message:"User is not created , please signup "})
    }

     return res.status(200).json({ message:" User login sucessfully"})

  } catch (error) {
    return res.status(404).json({message:" User not login try again",error})
  }
}