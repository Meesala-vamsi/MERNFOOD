const Stripe = require("stripe")
const Order = require("../Models/OrderModel/orderModel")
const User = require("../Models/UserModel/userModel")
const dotenv = require("dotenv")
const { asyncErrorController } = require("../Utils/asyncErrorController")
dotenv.config({path:"./config.env"})


const stripe = new Stripe(process.env.STRIPE_SEC_KEY)


const frontend_url = 'https://mernfood.netlify.app'

exports.placeOrder = asyncErrorController(async(req,res,next)=>{
    const order = await Order.create({userId:req.user._id,
        items:req.body.items,
        amount:req.body.amount,
        address:req.body.address,
        payment:req.body.payment

    })
    await User.findByIdAndUpdate(req.user._id,{cartData:{}})
    const line_items = req.body.items.map((item)=>({
        price_data:{
            currency:"inr",
            product_data:{
                name:item.name
            },
            unit_amount:item.price*100*80
        },
        quantity : item.quantity
    }))

    line_items.push({
        price_data:{
            currency:"inr",
            product_data:{
                name:"Delivery Charges"
            },
            unit_amount:2*100*80
        },
        quantity:1
    })

    const session = await stripe.checkout.sessions.create({
        line_items,
        mode:"payment",
        success_url:`${frontend_url}/verify?success=true&orderId=${order._id}`,
        cancel_url:`${frontend_url}/verify?success=false&orderId=${order._id}`
    })

    res.status(200).json({
        status:"success",
        session_url:session.url
    })
})

exports.verifyOrder= asyncErrorController(async(req,res,next)=>{
    const {orderId,success} = req.body 

    if(success==="true"){
        await Order.findByIdAndUpdate(orderId,{payment:true})
        res.status(200).json({
            status:"success",
            message:"Payment Successfull"
        })
    }else{
        await Order.findByIdAndDelete(orderId)
        res.status(404).json({
            status:"failed",
            message:"Payment failed"
        })
    }
})

exports.userOrders=asyncErrorController(async(req,res,next)=>{
    const order = await Order.find({userId:req.user._id})

    res.status(200).json({
        status:"success",
        data:{
            order
        }
    })
})


