const express=require("express")
const connectDB = require("./database/db")
const app=express()
const dotenv=require("dotenv")
const cookieParser=require("cookie-parser")
const authRoute=require("./routes/auth")


dotenv.config()
app.use(express.json())
app.use(cookieParser())
app.use("/api/auth",authRoute)


app.listen(5000,()=>{
  connectDB()
  console.log("app is running")
})