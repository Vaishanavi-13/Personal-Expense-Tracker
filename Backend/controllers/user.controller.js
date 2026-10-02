import asyncHandler from  '../utils/asyncHandler.js';
import apiError from '../utils/apiError.js';
import {User} from '../models/user.model.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const generateRefreshAndAccessToken = asyncHandler(async(userId)=>{
    const user = await User.findById(userId);

    if(!user){
        throw new apiError(404, "User not found");
    }

    const refreshToken = user.generateRefreshToken();
    const accessToken = user.generateAccessToken();

    user.refreshToken = refreshToken;
    await user.save({validateBeforeSave: false});

    return { refreshToken, accessToken };
})

const registerUser = asyncHandler(async(req, res, next) =>{

    const {name, email, password} = req.body;

    if(!name || !email || !password){
        throw new apiError(400, "Name, email and password are required");
    }

    if([name, email, password].some((field) =>(field) ?.trim() === "")){
        throw new apiError(400, "All fields are required");
    }

    const existingUser = await User.findOne({email});
    if(existingUser){
        throw new apiError(400, "Email already exists");
    }

    const createUserInstance = await User.create({
        name: name.toLowerCase().trim(),
        email,
        password
    })

    if(!createUserInstance){
        throw new apiError(500, "Failed to create user");
    }

    return res
    .status(201)
    .json({
        status : "Success",
        message : "User registered successfully",
        data :{
            name,
            email
        }
    })
})

const loginUser = asyncHandler(async(req, res, next) =>{

    const {email, password} = req.body;

    if(!email || !password){
        throw new apiError(400, "Email and password are required");
    }

    const user = await User.findOne({email})
      if(!user) throw new apiError(401, "Invalid email");

    const isPasswordValid = await User.isPasswordMatch(password);

    if(!isPasswordValid) throw new apiError(401, "Invalid password");

    const {refreshToken, accessToken} = await generateRefreshAndAccessToken(user._id);

    const options = {
        httpOnly : true
    }

    const isUserLogged = await User.findOne(user._id).select("-password","-refreshToken");
    if(!isUserLogged) throw new apiError(401, "User not found");

    return res
    .status(200)
    .cookie("refreshToken", refreshToken, options)
    .cookie("accessToken", accessToken, options)
    .json({
        status : "success",
        message : "User logged in successfully",
        data : {
            user,
            accessToken,
            refreshToken 
        }
    })
})

const logoutUser = asyncHandler(async(req, res, next) =>{
        
})

    
export {loginUser, logoutUser, registerUser, generateRefreshAndAccessToken};