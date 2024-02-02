import express  from 'express';
import { createComment, getPostComments, likeComment } from '../controllers/comment.controller.js';
import verifyUser from '../utils/verifyUser.js';

const router = express.Router();

router.route('/create').post(verifyUser,createComment);
router.route('/getPostComments/:postId').get(getPostComments);
router.route('/likeComment/:commentId').put(verifyUser,likeComment);

export default router;