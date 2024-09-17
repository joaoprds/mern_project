import mongoose from "mongoose"
import dotenv from 'dotenv';
dotenv.config();

const dbUser = process.env.DB_USER;
const dbPass = process.env.DB_PASS;

const conn = async () => {
    try{

        const dbConn = await mongoose.connect(`mongodb+srv://${dbUser}:${dbPass}@cluster0.l80m4.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`);

        console.log("connected with DataBase")
    }catch(err){
        console.error(err.toString())
    }
};
conn()

export default conn