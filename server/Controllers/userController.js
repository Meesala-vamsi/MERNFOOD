const User = require("../Models/UserModel/userModel");
const { asyncErrorController } = require("../Utils/asyncErrorController");
// const asyncErrorController  = require("../Utils/asyncErrorController");


//Create User
exports.createUser = asyncErrorController(async(req,res,next)=>{
    const user = await User.create(req.body)

    res.status(201).json({
        status:"success",
        message:"user added successfully"
    })
})