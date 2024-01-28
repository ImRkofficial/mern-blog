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

export { create };
