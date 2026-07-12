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
if(!process.env.GOOGLE_CLIENT_ID){
    throw new Error('Google client ID is not defined in env');
}
if(!process.env.GOOGLE_CLIENT_SECRET){
    throw new Error('Google Secret is not defined in env');
}

export const config = {
    NODE_ENV : process.env.NODE_ENV,
    MONGO_URI : process.env.MONGO_URI,
    JWT_SECRET : process.env.JWT_SECRET,
    FRONTEND_URL:process.env.FRONTEND_URL,
    GOOGLE_CLIENT_ID:process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET:process.env.GOOGLE_CLIENT_SECRET
}