import express from 'express'

const router = express.Router()

//Link user controller
import * as categoryController from '../controller/category.controller.js';

router.post("/save", categoryController.save)
router.get("/fetch", categoryController.fetch)
router.patch("/update/:_id", categoryController.updateById)
router.patch("/update", categoryController.updateByDetails)
router.delete("/delete/:_id", categoryController.deleteById)
router.delete("/delete", categoryController.deleteByCondition)



export default router