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

const editComment = asyncHandler(async (req,res)=>{
    try {
        const comment = await Comment.findById(req.params.commentId);
        if(!comment){
            return res.status(404).json({
                success:false,
                message:"Comment not found"
            })
        };

        if(req.user.id !== comment.userId && !req.user.isAdmin){
            return res.status(403).json({
                message:"You are not allowed to edit this comment",
                success:false
            })
        };

        const editedComment = await Comment.findByIdAndUpdate(req.params.commentId,{
            content:req.body.content
        },{
            new:true
        })
    } catch (error) {
        
    }
});

const deleteComment = asyncHandler(async (req,res)=>{
    try {
        const comment = await Comment.findById(req.params.commentId);
        if(!comment){
            return res.status(404).json({
                message:"Comment not found",
                success:false
            })
        };
        if(comment.userId.toString() !== req.user.id.toString() && !req.user.isAdmin){
            return res.status(400).json({
                message:"You are not allowed to delete this comment",
                user:req.user,
                success:false
            });
        }
        

        await Comment.findByIdAndDelete(req.params.commentId);

        return res.status(200).json({
            message:"Comment has been deleted",
            success:true
        })
    } catch (error) {
        return res.status(400).json({
            message:error.message,
            success:false
        })
    }
});

const getAllComments = asyncHandler(async (req,res)=>{
    
    if(!req.user.isAdmin){
        return res.status(403).json({
            message:"You are not allowed to access this route",
            success:false
        })
    }

   try {
    const startIndex = parseInt(req.query.startIndex) || 0 ;
    const limit = parseInt(req.query.limit) || 9;
    const sortDirection = req.query.sort === 'desc' ? -1 : 1;
    const comments = await Comment.find()
        .sort({createdAt:sortDirection})
        .skip(startIndex)
        .limit(limit);

        const totalComments = await Comment.countDocuments();

        const now = new Date();
        const oneMonthAgo = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate());
        const commentsInLastMonth = await Comment.countDocuments({createdAt:{$gte:oneMonthAgo}});
    return res.status(200).json({
        comments,
        commentsInLastMonth,
        totalComments
    });
   } catch (error) {
    return res.status(500).json({
        success:false,
        message:"Something went wrong"
    })
   }
});
export { createComment, getPostComments, likeComment,editComment, deleteComment,getAllComments };