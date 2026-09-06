import asyncHandler from  '../utils/asyncHandler.js';
import apiError from '../utils/apiError.js';
import {User} from '../models/user.model.js';


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