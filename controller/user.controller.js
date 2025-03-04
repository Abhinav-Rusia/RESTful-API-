//to connect with database
import '../models/connection.js';
import jwt from 'jsonwebtoken';
import randomString from 'randomstring';

import UserSchemaModel from '../models/user.model.js'

export const save = async (req, res) => {
    let userList = await UserSchemaModel.find()
    let length = userList.length
    let _id = length === 0 ? 1 : userList[length - 1]._id + 1
    let userDetails = { ...req.body, "_id": _id, "role": "user", "status": 0, "info": Date() }

    try {
        await UserSchemaModel.create(userDetails)
        res.status(201).json({ "message": "User Created." })
    } catch (error) {
        res.status(500).json({ "message": error.message })
    }
};

export const login = async (req, res) => {
    let conditional_details = { ...req.body, "status": 1 };
    let user = await UserSchemaModel.find(conditional_details)

    if (user.length != 0) {
        const payload = { "email": user[0].email }
        const key = randomString.generate(5)
        const token = jwt.sign(payload, key)
        res.status(200).json({ "token": token, "userList": user[0] })
    }
    else {
        res.status(401).json({ "error": "Unauthorized or tokken not found" })
    }
}

export const fetch = async (req, res) => {

    try {
        let userObj = req.query

        let userList = await UserSchemaModel.find(userObj)

        res.status(200).json({ "userList": userList })
    } catch (error) {
        res.status(500).json({ "message": error.message })
    }
}

export const updateById = async (req, res) => {
    try {
        let { _id } = req.params;
        let updateFields = req.body
        let updatedUser = await UserSchemaModel.findByIdAndUpdate(_id, updateFields, { new: true })
        if (!updatedUser) {
            return res.status(404).json({ "message": "User not found" })
        }
        res.status(200).json({ "message": "User updated successfully" })

    } catch (error) {
        res.status(500).json({ "message": error.message })
    }
}

export const updateByCondition = async (req, res) => {
    try {
        let { condition, updateFields } = req.body

        let updatedUser = await UserSchemaModel.findOneAndUpdate(condition, updateFields, { new: true })
        if (!updatedUser) {
            return res.status(404).json({ "message": "User not found" })
        }
        res.status(200).json({ "message": "User updated successfully" })
    } catch (error) {
        res.status(500).json({ "message": error.message })
    }
}

export const deleteById = async (req, res) => {
    try {
        let { _id } = req.params

        let deletedUser = await UserSchemaModel.findByIdAndDelete(_id)

        if (!deletedUser) {
            return res.status(404).json({ "message": "User not found" })
        }
        res.status(200).json({ "message": "User deleted successfully" })
    } catch (error) {
        res.status(500).json({ "message": error.message })
    }
}

export const deleteByCondition = async (req, res) => {
    try {
        if (!req.body || !req.body.condition) {
            return res.status(400).json({ "message": "Invalid request. Condition is required." });
        }

        let deletedUser = await UserSchemaModel.findOneAndDelete(req.body.condition);

        if (!deletedUser) {
            return res.status(404).json({ "message": "User not found" });
        }

        res.status(200).json({ "message": "User deleted successfully" });

    } catch (error) {
        res.status(500).json({ "message": error.message });
    }
};
