const mongoose = require("mongoose")


const foodSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Name field is required"]
    },
    description:{
        type:String,
        required:[true,"Description field is required"]
    },
    price:{
        type:Number,
        required:[true,"price field is required"]
    },
    image:{
        data:Buffer,
        type:String,
        required:[true,"image field is required"]
    },
    category:{
        type:String,
        required:[true,"Description field is required"]
    }

},{timestamps:true})

const Food = mongoose.model("Food",foodSchema)

module.exports = Food
