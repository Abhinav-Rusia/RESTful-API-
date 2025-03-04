//to connect with database
import "../models/connection.js";

import categorySchemaModel from "../models/category.model.js";

export const save = async (req, res) => {
    try {
        let categoryList = await categorySchemaModel.find()
        let length = categoryList.length
        let _id = length === 0 ? 1 : categoryList[length - 1]._id + 1
        let categoryDetails = { ...req.body, "_id": _id, "info": new Date() }

        await categorySchemaModel.create(categoryDetails)

        res.status(201).json({ "message": "Category Created." })

    } catch (error) {
        res.status(500).json({ "message": error.message })
    }
}

export const fetch = async (req, res) => {
    try {
        let categoryList = await categorySchemaModel.find()

        res.status(200).json({ "categoryList": categoryList })
    } catch (error) {
        res.status(500).json({ "message": error.message })
    }
}

export const updateById = async (req, res) => {
    try {
        let { _id } = req.params;
        let updateFields = req.body

        let updatedCategory = await categorySchemaModel.findByIdAndUpdate(_id, updateFields, { new: true })

        if (!updatedCategory) {
            return res.status(404).json({ "message": "Category not found" })
        }


        res.status(200).json({ "message": "Category updated successfully", "updatedCategory": updatedCategory })
    } catch (error) {
        res.status(500).json({ "message": error.message })
    }
}

export const updateByDetails = async (req, res) => {
    try {
        let { condition, updateFields } = req.body

        let updatedCategory = await categorySchemaModel.findOneAndUpdate(condition, updateFields, { new: true })

        if (!updatedCategory) {
            return res.status(404).json({ "message": "Category not found" })
        }

        res.status(200).json({ "message": "Category updated successfully" })
    } catch (error) {
        res.status(500).json({ "message": error.message })
    }
}

export const deleteById = async (req, res) => {
    try {
        let { _id } = req.params

        let deletedCategory = await categorySchemaModel.findByIdAndDelete(_id)

        if (!deletedCategory) {
            return res.status(404).json({ "message": "Category not found" })
        }

        res.status(200).json({ "message": "Category deleted successfully" })
    } catch (error) {
        res.status(500).json({ "message": error.message })
    }
}

export const deleteByCondition = async (req, res) => {
    try {
        if (!req.body || !req.body.condition) {
            return res.status(400).json({ "message": "Invalid request. Condition is required." });
        }

        let deletedCategory = await categorySchemaModel.findOneAndDelete(req.body.condition)

        if (!deletedCategory) {
            return res.status(404).json({ "message": "Category not found" })
        }

        res.status(200).json({ "message": "Category deleted successfully" })
    } catch (error) {
        res.status(500).json({ "message": error.message })
    }
}