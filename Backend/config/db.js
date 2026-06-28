import mongoose from "mongoose"
import { config } from "./config.js"

async function connectToDB() {
    const mongoURI = config.MONGO_URI

    if(!mongoURI){
        throw new Error("Mongo URI not Provided. Pleas Provide Mongo URI"); 
    }
    await mongoose.connect(mongoURI);
    console.log("Connected to MongoDB.");
}

export default connectToDB;
