//to connect with database
import '../models/connection.js';

import UserSchemaModel from '../models/user.model.js'

export const save = async (req, res) => {
    var userList = await UserSchemaModel.find()
    var length = userList.length
    var _id = length === 0 ? 1 : userList[length - 1]._id + 1
    //  console.log(_id)
    let userDetails = { ...req.body, "_id": _id, "role": "user", "status": 1, "info": Date() }


    try {
        await UserSchemaModel.create(userDetails)
        res.status(201).json({ "message": "User Created." })
    } catch (error) {
        res.status(500).json({ "message": error.message })
    }

};