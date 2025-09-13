import mongoose from  'mongoose'
import dotenv from 'dotenv'

dotenv.config()
async function connectDB() {
   try {
        await mongoose.connect(process.env.MONGO_URI);
        return true
    } catch (error) {
        console.error('Error connecting to MongoDB:', error.message);
        return false
    }
}

export default connectDB