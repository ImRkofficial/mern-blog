import express  from 'express';
import { createComment, editComment, getPostComments, likeComment ,deleteComment} from '../controllers/comment.controller.js';
import verifyUser from '../utils/verifyUser.js';

const router = express.Router();

router.route('/create').post(verifyUser,createComment);
router.route('/getPostComments/:postId').get(getPostComments);
router.route('/likeComment/:commentId').put(verifyUser,likeComment);
router.route('/editComment/:commentId').put(verifyUser,editComment);
router.route('/deleteComment/:commentId').delete(verifyUser,deleteComment);

export default router;