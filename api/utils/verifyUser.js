import jwt from 'jsonwebtoken';
import { asyncHandler } from './asyncHandler.js'
import { ApiError } from './apiError.js';

const verifyUser = asyncHandler(async (req,res,next)=>{
    const token = req.cookies.access_token

    if(!token){
         throw new ApiError(401,"Unauthorized")
    };

    jwt.verify(token,process.env.JWT_SECRET_KEY,(error,user)=>{
        if(error){
            throw new ApiError(401,"Unauthorized")
        }

        req.user = user;
        next();
    })
});

export default verifyUser;