import express from 'express';
const router = express.Router();
import verifyUser from './../utils/verifyUser.js';
import { create } from '../controllers/post.controller.js';


router.route('/create').post(verifyUser,create)

export default router;