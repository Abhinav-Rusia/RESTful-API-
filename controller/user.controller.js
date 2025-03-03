//to connect with database
import '../models/connection.js';
import jwt from 'jsonwebtoken';
import randomString from 'randomstring';
import url from 'url'

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
    let userObj = url.parse(req.url, true).query;
    // console.log(userObj);
    let userList = await UserSchemaModel.find(userObj)
    // console.log(userList);
    try {
        res.status(200).json({ "userList": userList })
    } catch (error) {
        res.status(500).json({ "message": error.message })
    }
}

export const update = async (req, res) => {
    try {
        let { _id } = req.params;
        let updateFields = req.body
        let updatedUser = await UserSchemaModel.findByIdAndUpdate(_id, updateFields, { new: true })
        if (!updatedUser) {
            res.status(404).json({ "message": "User not found" })
        }
        res.status(200).json({ "message": "User updated successfully" })

    } catch (error) {
        res.status(500).json({ "message": error.message })
    }
}