import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "./../utils/apiResponse.js";
import { ApiError } from "../utils/apiError.js";
import Post from './../models/post.model.js';

const create = asyncHandler(async (req, res) => {
  if (!req.user.isAdmin) {
    return res.status(403).json({
        success:false,
        message:"You are not allowed to create a post"
    })
  }

  if (!req.body.title || !req.body.content) {
    return res.status(400).json({
        success:false,
        message:"Please provide all required fields"
    });
  }

  const slug = req.body.title
    .split(" ")
    .join("-")
    .toLowerCase()
    .replace(/[]^a-zA-Z0-9-/g, "");

  const newPost = new Post({
    ...req.body,
    slug,
    userId: req.user.id,
  });


  try {
    const savedPost = await newPost.save();

    return res.status(201).json(
        new ApiResponse(201,savedPost,"Post created successfully")
    )
  } catch (error) {
    return res.status(400).json({
        success:false,
        message:error.message
    })
  }
});


const getPosts = asyncHandler(async (req,res)=>{
  try {
    const startIndex = parseInt(req.query.startIndex) || 0;
    const limit = parseInt(req.query.limit) || 9;
    const sortDirection = req.query.order === "asc" ? 1 : -1;

    const posts = await Post.find({
      ...(req.query.userId && {userId:req.query.userId}),
      ...(req.query.category && {category:req.query.category}),      
      ...(req.query.slug && {category:req.query.slug}),      
      ...(req.query.postId && {_id:req.query.postId}),      
      ...(req.query.searchTerm && {
        $or:[
          {title:{$regex:req.query.searchTerm, $options:'i'}},
          {content:{$regex:req.query.searchTerm, $options:'i'}}
        ]
      })
    }).sort({updatedAt:sortDirection}).skip(startIndex).limit(limit);

    const totalPosts = await Post.countDocuments();

    const now = new Date();

    const oneMonthAgo = new Date(
      now.getFullYear(),
      now.getMonth() -1,
      now.getDate()
    );

    const lastMonthPosts = await Post.countDocuments({
      createdAt:{$gte:oneMonthAgo}
    });

    return res.status(200)
    .json({
      posts,
      totalPosts,
      lastMonthPosts,
      message:"Success"
    })
    
  } catch (error) {
    return res.status(500).json({
      success:false,
      message:error?.message
    })
  }
});


const deletePost = asyncHandler(async(req,res)=>{
  if(!req.user.isAdmin || req.user.id !== req.params.userId){
    return res.status(403).json({
      success:false,
      message:"you are not allowed to delete this post"
    })
  };

  try {
    await Post.findByIdAndDelete(req.params.postId);
    return res.status(200).json(
      new ApiResponse(200,"Post has been deleted")
    )
  } catch (error) {
    return res.status(500).json({
      success:false,
      message:error.message
    }) 
  }
});

const updatePost = asyncHandler(async (req,res)=>{
  if(!req.user.isAdmin || req.user.id !== req.params.userId){
    return res.status(403).json({
      message:"You are not allowed to update this post",
      success:false
    })
  };

  try {
    const updatedPost = await Post.findByIdAndUpdate(req.params.postId,{
      $set:{
        title:req.body.title,
        category:req.body.category,
        image:req.body.image,
        content:req.body.content
      }
    },{new:true});

    return res.status(200).json(
      new ApiResponse(200,updatedPost,"Post updated successfully")
    )
    
  } catch (error) {
    return res.status(500).json({
      message:error.message,
      success:false
    })
  }
})

export { create, getPosts, deletePost,updatePost };
