import mongoose from "mongoose";

const connectDB=async()=>{
    try{
      await mongoose.connect(process.env.MONGO_URL);
      console.log("mongoDB connect succressfully")
    }catch(error){
     console.log(error)
    }
}
export default connectDB;