import jwt from 'jsonwebtoken';
import { asyncHandler } from './asyncHandler.js'
import { ApiError } from './apiError.js';

const verifyUser = asyncHandler(async (req,res,next)=>{
    const token = req.cookies.access_token

    if(!token){
         return res.status(400).json({
            message:"Unauthorized"
         })
    };

    jwt.verify(token,process.env.JWT_SECRET_KEY,(error,user)=>{
        if(error){
            return res.status(400).json({
                message:"Unauthorized"
             })
        }

        req.user = user;
        next();
    })
});

export default verifyUser;