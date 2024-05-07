import mongoose from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect("mongodb://127.0.0.1:27017/Farmhelp");
        console.log('Connected to mongodb')
    } catch (e) {
        console.log(e.message)
    }
}

export default connectDB;