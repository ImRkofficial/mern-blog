import Comment from "../models/comment.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const createComment = asyncHandler(async(req,res)=>{
    try {
        const {content,postId,userId} = req.body;

        
        if(userId !== req.user.id){
            return res.status(400).json({
                message:"You are not allowed to create this comment"
            })
        };

        const newComment = new Comment({
            content,
            postId,
            userId
        });

        await newComment.save();
        
        return res.status(200).json({
            newComment,
            message:"Success"
        })

    } catch (error) {
     return res.status(500).json({
        message:error?.message,
        success:false
     })   
    }
});


export { createComment };