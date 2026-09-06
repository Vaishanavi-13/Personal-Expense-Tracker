import dotenv from "dotenv";
import connectDB from "./config/db.js";
import app from "./server.js";
import colors from "colors";


dotenv.config({path : './.env'});

connectDB().then(()=>{
    app.listen(process.env.port || 5000, ()=>{
        console.log(`Server is running on port ${process.env.PORT || 5000}`.bgCyan.white);
    })
}).catch((err) =>{
    console.log("Error connecting to the database:", err.bgRed.white);
})