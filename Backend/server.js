import app from "./src/app.js"
import dotenv from "dotenv"
import connectToDB from "./config/db.js";
import dns from "dns"
dotenv.config();

dns.setServers(["1.1.1.1", "8.8.8.8"])


const PORT = process.env.PORT

const startServer = async ()=>{
    try {
        await connectToDB();
        app.listen(PORT, ()=>{
            console.log(`Connected to server at http://localhost:${PORT}`)
        })
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
}

startServer();


