const mongoose = require("mongoose")

const productSchema = new mongoose.Schema({
    name:{
        type:String,
        require:true,

    },
    price:{
        type:Number,
        require:true
    },
    user_id:{
        type:mongoose.Schema.ObjectId,
        require:true,
        ref:"employedata"
    },
    photo:{
        type:String,
        require:true
    }
},{
        timestamps:true,versionKey:false
    })

    module.exports =mongoose.model("Productschema",productSchema)