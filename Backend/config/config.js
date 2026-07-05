import dotenv from "dotenv"

dotenv.config();
// 
if(!process.env.MONGO_URI){
    throw new Error("MONGO_URI is not defined in .env")
}

if(!process.env.JWT_SECRET){
    throw new Error('JWT_SECRET KEY is not defined in env')
}
if(!process.env.FRONTEND_URL){
    throw new Error('FRONTEND URL is not defined in env')
}

export const config = {
    MONGO_URI : process.env.MONGO_URI,
    JWT_SECRET : process.env.JWT_SECRET,
    FRONTEND_URL:process.env.FRONTEND_URL
}