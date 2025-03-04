import mongoose from 'mongoose'

const categorySchema = mongoose.Schema({
    _id: Number,
    name: {
        type: String,
        required: [true, "Product Name is required"],
        lowercase: true,
        trim: true
    },
    imageUrl: {
        type: String,
        required: [true, "Product Image is required"],
        lowercase: true,
        trim: true
    }
})

const categorySchemaModel = mongoose.model("category", categorySchema)

export default categorySchemaModel