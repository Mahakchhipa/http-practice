const express = require("express")

const router = express()
const usermodel = require("./../controller/userController")
const auth = require("../middleware/auth")

router.post("/signup",usermodel.employeSignup)
router.get("/alluser",usermodel.getalluser)
router.get("/singleuser/:id",auth,usermodel.getsingleuser)
router.get("/deleteuser/:id",usermodel.deleteuser)
router.patch("/updateuserdata/:id",usermodel.updateuser)
router.post("/loginuser",usermodel.userLogin)
router.put("/resetuser",usermodel.resetUser)
router.patch("/forgetpassword",usermodel.forgetPassword)

module.exports = router