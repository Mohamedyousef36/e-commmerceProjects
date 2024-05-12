import mongoose from "mongoose";

// Connect to DB
const dbConnect = async () => {
    
        await mongoose.connect(process.env.DB_URI)

        console.log(`connected to DB`);
   

}
export default dbConnect