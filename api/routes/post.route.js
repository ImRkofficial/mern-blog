import express from 'express';
const router = express.Router();
import verifyUser from './../utils/verifyUser.js';
import { create, deletePost, getPosts, updatePost } from '../controllers/post.controller.js';


router.route('/create').post(verifyUser,create)
router.route('/getposts').get(getPosts)
router.route('/deletepost/:postId/:userId').delete(verifyUser,deletePost)
router.route('/updatepost/:postId/:userId').put(verifyUser,updatePost)

export default router;