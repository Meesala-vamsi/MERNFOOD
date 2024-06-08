const mongoose = require("mongoose")
const validator = require("validator")
const bcrypt = require("bcrypt")
const crypto = require("crypto")

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Name field is required"]
    },
    email:{
        type:String,
        required:[true,"Email field is required."],
        validate:[validator.isEmail,"Entera Valid Email Address"],
        unique:true

    },
    password:{
        type:String,
        required:[true,"Password field is required"],
        min:[5,"Password should contain minimum of 5 characters."]
    },
    isAdmin:{
        type:Boolean,
        default:false
    },
    cartData:{
        type:Object,
        default:{}
    }
},{timestamps:true,minimize:false})

userSchema.pre("save",async function(next){
    if(!this.isModified("password")) return next()
    const hashedPassword=await bcrypt.hash(this.password,10)
    this.password = hashedPassword
})

userSchema.methods.isPasswordChanged=function(jwtTime){
    const convertionTime = this.updatedAt.getTime()/1000
    console.log(jwtTime)
    console.log(convertionTime)

    return jwtTime < convertionTime
}

userSchema.methods.comparePasswordsInDb= async function(password){
    const checkPassword = await bcrypt.compare(password,this.password)
    return checkPassword
}

userSchema.methods.cryptoCodeForAuth= function(){
    const aa = crypto.randomBytes(12).toString("hex")

    const c = crypto.createHash("sha256").update(aa).digest("hex")
    return c
}
const User = mongoose.model("User",userSchema)

module.exports= User