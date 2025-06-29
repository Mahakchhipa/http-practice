const express = require("express")
const Router = express.Router()

const productController = require("../controller/productController")
const auth = require("../middleware/auth")

// router.post("/",auth,productController.addProduct)
Router.post("/",productController.addProduct)

Router.get("/",productController.getProducts)

module.exports = Router