import express  from 'express';
import { createComment, getPostComments } from '../controllers/comment.controller.js';
import verifyUser from '../utils/verifyUser.js';

const router = express.Router();

router.route('/create').post(verifyUser,createComment);
router.route('/getPostComments/:postId').get(getPostComments);

export default router;