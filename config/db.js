const mongoose = require("mongoose")

function DbConnection(){
    mongoose.connect(process.env.MONGO_URI).then(()=>{
        console.log("connected to datatbase");
        
    })
}

module.exports = DbConnection