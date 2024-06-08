const mongoose = require("mongoose")

const orderSchema = new mongoose.Schema({
    userId:{
        type:String,
        required:[true,"userId is required"]
    },
    items:{
        type:Array,
        required:[true,"Items field is required."]
    },
    amount:{
        type:Number,
        required:[true,"Amount field is required."]
    },
    address:{
        type:Object,
        required:[true,"Address field is required."]
    },
    date:{
        type:Date,
        default:Date.now()
    },
    payment:{
        type:Boolean,
        required:[true,"Payment field is required."],
        default:false
    },
    status:{
        type:String,
        default:"Food Processing"
    }
})

const Order = mongoose.model("Order",orderSchema)

module.exports = Order