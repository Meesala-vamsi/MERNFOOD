const express = require("express")
const router = require("./Routes/foodRoutes")
const golbalErrorController  = require("./Controllers/globalErrorController")
const ErrorFeature = require("./Utils/globalErrorFeature")
const userRouter=require("./Routes/userRoutes")
const cartRouter=require('./Routes/cartRoutes')
const orderRouter=require("./Routes/orderRoutes")
const cors = require("cors")
 const app = express()

app.use(express.json())

app.use(cors())

app.use("/images",express.static("Uploads"))

app.use("/api/food",router)
app.use("/api/user",userRouter)
app.use("/api/cart",cartRouter)
app.use("/api/cart/order",orderRouter)



app.all("*",function(req,res,next){
    const err = new ErrorFeature(`Invalid endpoint ${req.originalUrl}.`,400)
    next(err)
})

app.use(golbalErrorController)



module.exports = app