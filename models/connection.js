import mongoose from "mongoose";

const url = "mongodb://localhost:27017/stackbatch121_26feb2025";

mongoose.connect(url).then(() => {
    console.log("Database connected");
}).catch((err) => {
    console.log(err);
})
