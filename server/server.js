const mongoose = require("mongoose")
const dotenv = require("dotenv")
const app = require('./app')
const router = require("./Routes/foodRoutes")

dotenv.config({path:"./config.env"})

mongoose.connect(process.env.CONN_STR,{
    useNewUrlParser:true,
    useUnifiedTopology:true
})
.then((conn)=>{
    console.log("Connected to database....")
})
.catch((error)=>{
    console.log(error.message)
})

const port = process.env.PORT

app.listen(port,()=>{
    console.log("Server Started at port " + port)
})