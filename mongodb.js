const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/sundayMobility",{useNewUrlParser:true},(err,connected)=>{
    if(err){
        return console.log("Database connection error")
    }
    console.log("Database connected")
})
