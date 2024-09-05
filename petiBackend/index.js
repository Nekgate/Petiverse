const express=require("express")
const connectDB = require("./database/db")
const app=express()
const dotenv=require("dotenv")

dotenv.config()


app.listen(process.env.PORT,()=>{
    connectDB()
    console.log("app is running")
})