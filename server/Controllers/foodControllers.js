const express = require("express")
const Food = require("../Models/FoodModel/FoodModel")
const { asyncErrorController } = require("../Utils/asyncErrorController")
const fs = require('fs')



// creating a food Details

exports.addFoodDetails= asyncErrorController( async(req,res,next)=>{
    // console.log(req)
    const food = await Food.create({
        name:req.body.name,
        description:req.body.description,
        price:req.body.price,
        category:req.body.category,
        image:req.file.path
    })
    res.status(201).json({
        status:"success",
        message:"Successfully Added a food Item...",
        food
    })
    
})


//GET ALL FOOD DATA

exports.getAllFoodList=asyncErrorController(async(req,res,next)=>{
    const foods = await Food.find({})
    res.status(200).json({
        status:"success",
        data:{
            foods
        }
    })
})

exports.deleteFoodDetails=asyncErrorController(async(req,res,next)=>{

    const food = await Food.findById(req.params.id)
    fs.unlink(`Uploads/${food.image}`,()=>{
        console.log("Food image Deleted From Uploads Folder")
    })
    await Food.findOneAndDelete(req.params.id,{new:true,runValidators:true})
    res.status(200).json({
        status:"success",
        message:"Successfully Food Item Deleted...."
    })
})

exports.updateFood=async(req,res,next)=>{}
