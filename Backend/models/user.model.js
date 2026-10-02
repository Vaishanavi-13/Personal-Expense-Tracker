import mongoose from "mongoose";
import {Schema} from "mongoose";
import jwt from "jsonwebtoken";

const userSchema = new Schema(
    {
        name :{
            type: String,
            required : [true, "Please provide a name"]
        },
        email:{
            type: String,
            required : [true, "Please provide an email"],
            unique : [true, "Email already exists"]
        },
        password:{
            type: String,
            required : [true, "Please provide a password"]
        }

    },
    {timestamps: true}
);

// jwt.sign(
//     { ... },                         // 1. Payload
//     process.env.ACCESS_TOKEN_SECRET, // 2. Secret key
//     { expiresIn: ... }               // 3. Options
// )

const isPasswordMatch = (password) =>{
    return bcrypt.compareSync(password, this.password);
}

const generateAccessToken = function(){
    return jwt.sign(
        {
            _id : this._id,
            name : this.name,
            email : this.email
        },
        process.env.ACCESS_TOKEN_SECRET
        ,
        {
            expiresIn : process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}

const generateRefreshToken = function(){
    return jwt.sign(
        {
            _id : this._id
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn : process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}

export const user = mongoose.model("User", userSchema);
export {isPasswordMatch, generateAccessToken, generateRefreshToken};