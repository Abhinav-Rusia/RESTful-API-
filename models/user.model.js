import mongoose from 'mongoose'
import UniqueValidator from 'mongoose-unique-validator'

const userSchema = mongoose.Schema({
    _id: Number,
    name: {
        type: String,
        required: [true, "Name is required"],
        lowercase: true,
        trim: true
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        lowercase: true,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        trim: true,
        maxlength: 10,
        minlength: 5,
    },
    mobile: {
        type: Number,
        required: [true, "Mobile is required"],
        minlength: 10,
        maxlength: 10,
        trim: true
    },
    address: {
        type: String,
        required: [true, "Address is required"],
        trim: true,
    },
    city: {
        type: String,
        required: [true, "City is required"],
        trim: true,
    },
    gender: {
        type: String,
        required: [true, "Gender is required"],
        trim: true,
    },
    role: String,
    status: Number,
    info: String,
});

// apply the plugins

userSchema.plugin(UniqueValidator)

//compile schema

const UserSchemaModel = mongoose.model("user_collection", userSchema)

export default UserSchemaModel