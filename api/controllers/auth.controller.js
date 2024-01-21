import User from './../models/user.model.js';
import {asyncHandler} from './../utils/asyncHandler.js';
import {ApiError} from '../utils/apiError.js';
import {ApiResponse} from '../utils/apiResponse.js';

const signUp = asyncHandler(async (req,res)=>{
    const { username, email, password } = req.body;

    if(!username || !email || !password){
        throw new ApiError(400,"All fields are required")
    }

    const existedUser = await User.findOne({
        $or:[{username},{email}]
    });

    if(existedUser){
        throw new ApiError(400,"User already exist")
    };

    const user = await User.create({
        username:username.toLowerCase(),
        email,
        password
    });

    const createdUser = await User.findById(user._id).select("-password");

    if(!createdUser){
        throw new ApiError(500,"Something Went wrong while creating user")
    }

    return res.status(201).json(
        new ApiResponse(201,createdUser,"Signup successfully")
    )
});

export {signUp}