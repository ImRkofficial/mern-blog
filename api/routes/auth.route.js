import express from 'express';
import { signIn, signUp, google } from '../controllers/auth.controller.js';

const router = express.Router();

router.route("/signup").post(signUp)
router.route("/signin").post(signIn)
router.route("/google").post(google)


export default router;