import express from 'express';
const router = express.Router();

//Link user controller
import * as userController from '../controller/user.controller.js';

router.post("/save", userController.save);
router.post("/login", userController.login);
router.get("/fetch", userController.fetch);
router.patch("/update/:_id", userController.update)
export default router;
