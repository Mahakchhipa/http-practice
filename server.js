const mongoose = require("mongoose");
const express = require("express");
const app = express();
const cors = require("cors")
const port = 3000;

const employeeRoute = require("./router/userrouter")

const mongourl = "mongodb://localhost:27017/class";

mongoose.connect(mongourl)
.then(()=>{
    console.log("🛜 Mongodb is connected  " ,port)
})
.catch( (error)=>{
    console.log(" Mongodb is not connected " , error)
})

app.use(express.json())

app.use(cors())

app.listen(port,()=>{
    console.log(`👩‍💻 Server is running on ${port}`)
})

