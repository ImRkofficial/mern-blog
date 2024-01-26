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

export {updateUserInfo};