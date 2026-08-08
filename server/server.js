import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
const app=express();
app.use(cors());
app.use(express.json());
app.get("/",(req,res)=>{
    res.json({
        message:"Talksy API is running"
    })
})
app.get("/api/health",(req,res)=>{
    res.json({
        status:"OK",
        project:"Social Anxiety Assistant"
    })
})
const PORT=process.env.port||5000;
app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`)
})