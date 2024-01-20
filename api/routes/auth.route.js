import express from 'express';
import { signUp } from '../controllers/auth.controller.js';

const router = express.Router();

router.route("/signup").post(signUp)


export default router;