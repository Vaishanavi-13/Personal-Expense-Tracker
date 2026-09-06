import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";

const app = express();

dotenv.config();

//middleware
app.use(cors());
app.use(morgan("dev"));

//routes

app.get("/", (req,res)=>{
    res.send("Server is started successfully");
})

const PORT = process.env.PORT || 5000;

app.listen(PORT ,()=>{
    console.log(`Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`.bgCyan.white);
})

export default app;