import express from 'express';
const router = express.Router();

//Link user controller
import * as userController from '../controller/user.controller.js';

router.post("/save", userController.save);

export default router;
