import mongoose from "mongoose"
export const dbConnect = async ()=>{

    try{
       const conn =  await mongoose.connect(process.env.MONGO_URI);
       console.log(`MongoDB Connected at ${conn}`);
    }catch(error){
        console.error(`Error: ${error.message}`);
    }

}

export default dbConnect