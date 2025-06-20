const express = require("express")

const router = express()
const usermodel = require("./../controller/userController")

router.post("/signup",usermodel.employeSignup)
router.get("/alluser",usermodel.getalluser)
router.get("/singleuser/:id",usermodel.getsingleuser)
router.get("/deleteuser/:id",usermodel.deleteuser)
router.patch("/updateuserdata/:id",usermodel.updateuser)
router.post("/loginuser",usermodel.userLogin)

module.exports = router