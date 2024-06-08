const express = require("express")
const User = require("../Models/UserModel/userModel")
const { asyncErrorController } = require("../Utils/asyncErrorController")
const ErrorFeature = require("../Utils/globalErrorFeature")
const jwt = require("jsonwebtoken")



exports.authProtectedRoute=async(req,res,next)=>{
    const authHead = req.headers.authorization
    if(authHead===undefined){
        const error = new ErrorFeature("Invalid jwt token",401)
        next(error)
    }
    const token = authHead.split(" ")[1]

    if(token === undefined){
        const error = new ErrorFeature("Invalid jwt token",401)
        next(error)
    }else{
        jwt.verify(token,"vamsisony",async(error,data)=>{
            if(error){
                const error = new ErrorFeature("Invalid Jwt token",401)
                next(error)
            }else{
                const user = await User.findById(data.id)
                // if(user.isPasswordChanged(data.iat)===false){
                //     const error = new ErrorFeature("something went wrong.Please login again.")
                //     next(error)
                // }
                    req.user = user
                    next()
            }
        })
    }
}


const generateJwt=(payload,res)=>{
    const createJwtToken = jwt.sign(payload,"vamsisony")
    return createJwtToken
}

exports.userSignup = asyncErrorController(async(req,res,next)=>{
    const user = await User.create(req.body)
    const token = generateJwt({id:user._id})
    res.status(201).json({
        status:"success",
        token,
        message:"Account Created Successfully.Please Login.."
    })
})


exports.login=asyncErrorController(async(req,res,next)=>{
    const user = await User.findOne({email:req.body.email})
    if((!await user.comparePasswordsInDb(req.body.password)) || !user){
        const error = new ErrorFeature("Invalid Email or Password",401)
        next(error)
    }
       const token = generateJwt({id:user._id})

       res.status(200).json({
        status:"success",
        token,
        message:"Login Successfully..."
       })

})

exports.forgotPassword=asyncErrorController(async(req,res,next)=>{
    const user = await User.find({email:req.body.email})
   const a = user.cryptoCodeForAuth
   console.log(a)
  
})