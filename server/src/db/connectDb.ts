import mongoose from 'mongoose';

export const connectDB = async (mongoURI:string) => {
    try {
        await mongoose.connect(mongoURI);
        console.log('MongoDB Connected');
    } catch (error) {
        console.error('MongoDB Connection Error:', error);
        process.exit(1); // Exit process with failure
    }
};



