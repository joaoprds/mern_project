import dotenv from 'dotenv';
import express from "express";
import path from "path";
import { fileURLToPath } from 'url';
import cors from "cors";
import router from './routes/Router.js';
import dbConfig from  './config/db.js';
dotenv.config();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const port = process.env.PORT;
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(router);

app.use(cors({credentials:true,origin: process.env.FRONTEND}));
app.use("/uploads", express.static(path.join(__dirname,"/uploads")));



app.listen(port, () => {
    console.log(`App run at port ${port}`);
})