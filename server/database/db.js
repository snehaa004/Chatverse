import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();



const Connection =async()=>{
    const USERNAME=process.env.DB_USERNAME;
    const PASSWORD=process.env.DB_PASSWORD;
    const mongoURL=`mongodb+srv://${USERNAME}:${PASSWORD}@chatverse.nnxnb.mongodb.net/?retryWrites=true&w=majority&appName=ChatVerse`;

    try{
        await mongoose.connect(mongoURL);
        console.log("Database is connected");
    }catch(error){
        console.log("Error while connecting to database",error.message);
    }
}


export default Connection;