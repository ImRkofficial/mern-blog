import express from 'express';
const router = express.Router();
import verifyUser from './../utils/verifyUser.js';
import { create, getPosts } from '../controllers/post.controller.js';


router.route('/create').post(verifyUser,create)
router.route('/getposts').get(getPosts)

export default router;