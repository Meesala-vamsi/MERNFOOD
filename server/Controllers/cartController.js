const express = require("express")
const {asyncErrorController} = require('../Utils/asyncErrorController')
const User = require("../Models/UserModel/userModel")
const ErrorFeature = require("../Utils/globalErrorFeature")

//ADD CART
exports.createCart=asyncErrorController(async(req,res,next)=>{

    const user = await User.findById(req.user._id)
    console.log(req.user._id)
    let cartData = await user.cartData
    if(!user){
        const error = new ErrorFeature("user not found",401)
        next(error)
    }

    if(!cartData[req.body.id]){
        cartData[req.body.id] = 1
    }else{
        cartData[req.body.id] += 1
    }

    await User.findByIdAndUpdate(req.user._id,{cartData})

    res.status(201).json({
        status:"success",
        message:"Item Added to cart."
    })





})  

//GET CART
exports.getCart=asyncErrorController(async(req,res,next)=>{
    const user = await User.findById(req.user._id)
    let cartData = await user.cartData
    res.status(200).json({
        status:"success",
        cartData
    })
})

//DELETE CART
exports.deleteCart=asyncErrorController(async(req,res,next)=>{
    const user = await User.findById(req.user._id)
    let cartData = await user.cartData
    if(!user){
        const error = new ErrorFeature("user not found",401)
        next(error)
    }

    if(cartData[req.body.id]>0){
        cartData[req.body.id] -= 1
    }

    

    await User.findByIdAndUpdate(req.user._id,{cartData})

    res.status(200).json({
        status:"success",
        message:"Item Deleted Successfully..."
    })

})

