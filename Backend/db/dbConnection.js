import mongoose from "mongoose";

const dbConnection = async()=>{
  
    try {  
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connection Successful to Database.");
    } catch (error) {
        console.log("Error connection to Mongo Server", error.message);
    }
};


export default dbConnection;


