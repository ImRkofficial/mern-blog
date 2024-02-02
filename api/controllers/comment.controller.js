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

const getPostComments = asyncHandler(async(req,res)=>{
    try {
        const comments = await Comment.find({postId:req.params.postId}).sort({
            createdAt:-1
        });

        return res.status(200).json({
            comments,
            message:"Success"
        })
    } catch (error) {
        return res.status(500).json({
            message:error.message
        })
    }
});

const likeComment = asyncHandler(async(req,res)=>{
    try {
        const comment =  await Comment.findById(req.params.commentId);

        if(!comment){
            return res.status(404).json({
                message:"Comment not found"
            })
        };

        const userIndex = comment.likes.indexOf(req.user.id);

        if(userIndex === -1){
            comment.numberOfLikes += 1;
            comment.likes.push(req.user.id)
        }else{
            comment.numberOfLikes -=1;
            comment.likes.splice(userIndex,1)
        }

        await comment.save();

        return res.status(200).json({comment})
    } catch (error) {
        return res.status(500).json({
            message:error?.message
        })
    }
});


export { createComment, getPostComments, likeComment };