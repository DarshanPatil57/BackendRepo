const mongoose = require("mongoose")


const userSchem = new mongoose.Schema({
    username:{
        type:String,
        required: true,
        trim:true,
        lowercase:true,
        unique:true,
        minLength:[3,'Username must be atleast 3 characters long !']
    },
    email:{
        type:String,
        required: true,
        trim:true,
        lowercase:true,
        unique:true,
        minLength:[13,'Email must be atleast 13 characters long !']
    },
    password:{
        type:String,
        required: true,
        trim:true,
        unique:true,
        minLength:[5,'Password must be atleast 5 characters long !']
    }
})


const user = mongoose.model('user',userSchem)

module.exports = user