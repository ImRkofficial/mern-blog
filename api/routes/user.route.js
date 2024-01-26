import express from 'express'
import { deleteUser, updateUserInfo } from '../controllers/user.controller.js';
import verifyUser from '../utils/verifyUser.js';

const router = express.Router();

router.route('/update/:userId').put(verifyUser,updateUserInfo)
router.route('/delete/:userId').delete(verifyUser,deleteUser)



export default router;