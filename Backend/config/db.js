import mongoose from "mongoose";
import {DB_NAME} from "../constants.js";
import colors from "colors";

const connectDB = async () =>{

    try{
        const connection = await mongoose.connect(process.env.MONGODB_URL,{
            dbName: DB_NAME,
            serverSelectionTimeoutMS: 10000
        });
        console.log(`Connected to MongoDB !! HOST: ${connection.connection.host}`.bgGreen.white);
    }
    catch(err){
        console.log("Error connecting to MongoDB:", err.bgRed.white);
    }
}

export default connectDB;