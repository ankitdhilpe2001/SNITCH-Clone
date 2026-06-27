import app from "./src/app.js"
import dotenv from "dotenv"
import connectToDB from "./config/db.js";

dotenv.config();

const PORT = process.env.PORT

const connectDB = async ()=>{
    try {
        await connectToDB();
    } catch (error) {
        console.error("Failed to start server:", error.message);
        process.exit(1);
    }
}

connectDB();

app.listen(PORT, ()=>{
    console.log(`Connected to server at http://localhost:${PORT}`)
})