import express from 'express'
import { deleteUser, signOut, updateUserInfo } from '../controllers/user.controller.js';
import verifyUser from '../utils/verifyUser.js';

const router = express.Router();

router.route('/update/:userId').put(verifyUser,updateUserInfo)
router.route('/delete/:userId').delete(verifyUser,deleteUser)
router.route('/signout').post(verifyUser,signOut)



export default router;