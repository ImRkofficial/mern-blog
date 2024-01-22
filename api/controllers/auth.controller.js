import User from "./../models/user.model.js";
import { asyncHandler } from "./../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import jwt from "jsonwebtoken";

const signUp = asyncHandler(async (req, res, next) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    throw new ApiError(400, "All fields are required");
  }

  const existedUser = await User.findOne({
    $or: [{ username }, { email }],
  });

  if (existedUser) {
    throw new ApiError(400, "User already exists");
  }

  const user = await User.create({
    username: username.toLowerCase(),
    email,
    password,
  });

  const createdUser = await User.findById(user._id).select("-password");

  if (!createdUser) {
    throw new ApiError(500, "Something Went wrong while creating user");
  }

  return res
    .status(201)
    .json(new ApiResponse(201, createdUser, "Signup successfully"));
});

const signIn = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password || !email === "" || password === "") {
    res.status(401).json({
      success: false,
      message: "All fields are required",
    });
  }

  const isUserExist = await User.findOne({ email });

  if (!isUserExist) {
    res.status(404).json({
      success: false,
      message: "User not found",
    });
  }
  console.log(isUserExist)

  const isPasswordCorrect = await isUserExist.comparePassword(password);
  console.log("User comapre password",isPasswordCorrect)

  if (!isPasswordCorrect) {
    res.status(401).json({
      success: false,
      message: "Invalid credentials",
    });
  }

  const user = await User.findById(isUserExist._id).select("-password")

  const accessToken = jwt.sign(
    { id: isUserExist._id },
    process.env.JWT_SECRET_KEY,
    { expiresIn: "2d" }
  );
  const cookieOptions = {
    httpOnly:true
  }

   return res.status(200)
    .cookie("access_token",accessToken,cookieOptions)
    .json(user)

});

export { signUp,signIn };
