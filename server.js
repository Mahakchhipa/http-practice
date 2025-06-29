const mongoose = require("mongoose");
const express = require("express");
const nodeMailer = require("nodemailer")
const cors = require("cors")
require('dotenv').config()
const port = process.env.PORT||5000;
const fileupload = require("express-fileupload");
const app = express();
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors())
app.use(fileupload())

const employeroute = require("./router/userrouter")

app.use("/employee",employeroute);

const productRoute = require("./router/productRouter")

app.use("/product", productRoute)

const mongourl = process.env.MONGO_URL

mongoose.connect(mongourl)
.then(()=>{
    console.log("🛜 Mongodb is connected  " ,port)
})
.catch( (error)=>{
    console.log(" Mongodb is not connected " , error)
})

app.listen(port,()=>{
    console.log(`👩‍💻 Server is running on ${port}`)
})

