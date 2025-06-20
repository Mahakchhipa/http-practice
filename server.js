const mongoose = require("mongoose");
const express = require("express");
const app = express();
const cors = require("cors")
const port = 5050;

app.use(express.json())

app.use(cors())

const employeroute = require("./router/userrouter")

app.use("/employee",employeroute);



const mongourl = "mongodb://localhost:27017/class";

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

