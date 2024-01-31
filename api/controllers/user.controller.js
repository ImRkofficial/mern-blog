import User from "../models/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import bcrypt from 'bcrypt';

const updateUserInfo = asyncHandler(async (req,res)=>{
    if(req.user.id !== req.params.userId){
        return res.status(401).json({
            message:"You are not allowed to update to this user",
            success:false
        })
    };

    if(req.body.password){
        if(req.body.password.length < 6){
            return res.status(400).json({
                message:"Password should be 7 character long"
            });
        };

        req.body.password = await bcrypt.hash(req.body.password,10)
    };

    if(req.body.username){
        if(req.body.username.length < 7 || req.body.username.length > 20){
            return res.status(400).json({
                message:"Username must be between 7 to 20 characters long"
            })
        };

        if(req.body.username.includes(" ")){
            return res.status(400).json({
                message:"Username can not contain spaces"
            })
        }
        if(req.body.username !== req.body.username.toLowerCase()){
            return res.status(400).json({
                message:"Username must be lowercase"
            })
        }
        if(!req.body.username.match(/^[a-zA-Z0-9]+$/)){
            return res.status(400).json({
                message:"Username can only contain letters and numbers"
            })
        }
    };

    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.userId,{
            $set:{
                username:req.body.username,
                email:req.body.email,
                password:req.body.password,
                profilePicture:req.body.profilePicture
            }
        },
        {new:true}
        ).select("-password");

        return res.status(200).json({
            success:true,
            message:"profile update successfully",
            updatedUser
        })
    } catch (error) {
        
    }
});

const deleteUser = asyncHandler(async (req,res)=>{
    if(!req.user.isAdmin && req.user.id !== req.params.userId){
        return res.status(401).json({
            message:"You are not allowed to delete this user"
        })
    };

    try {
        await User.findByIdAndDelete(req.params.userId);
       return res.status(200).json({
            success:true,
            message:"User has been deleted"
        })
    } catch (error) {
       return res.status(400).json({
        success:false,
        message:error.message
       })
    }
});

const signOut = asyncHandler(async (req,res)=>{
    try {
        res.clearCookie("access_token").status(200).json({
            message:"User has been sign out"
        })
    } catch (error) {
        res.status(400).json({
            message:error.message
        })
    }
});


const getUsers = asyncHandler(async (req,res)=>{
    if(!req.user.isAdmin){
        return res.status(400).json({
            message:"You are not allowed to see all users",
            succss:false
        });
    }
    try {
        const startIndex = parseInt(req.query.startIndex) || 0;
        const limit = parseInt(req.query.limit) || 9;
        const sortDirection = req.query.sort === "asc" ? 1 : -1;

        const users = await User.find()
        .sort({createdAt:sortDirection})
        .skip(startIndex)
        .limit(limit).select("-password")
        
        const totalUsers = await User.countDocuments();

        const now = new Date();

        const oneMonthAgo = new Date(
            now.getFullYear(),
            now.getMonth() - 1,
            now.getDate()
        );

        const lastMonthUsers = await User.countDocuments({
            createdAt:{$gte:oneMonthAgo}
        });

        return res.status(200).json({
            users,
            totalUsers,
            lastMonthUsers,
            message:"Success"
        })
        
    } catch (error) {
        return res.status(400).json({
            message:error.message,
            success:false
        })
    }
})

export {updateUserInfo,deleteUser,signOut,getUsers};