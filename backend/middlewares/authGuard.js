import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const jwtSecret = process.env.JWT_SECRET

export const authGuard = async (req, res, next) => {

    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if(!token) {return res.status(401).json({errors: ["Access Denied"]})}

    try{
        

        const verified = jwt.verify(token, jwtSecret);
        

        req.user = await User.findOne({ _id: verified.id}).select("-password");
        

        next()
    }catch(err){
        res.status(401).json({errors: ["Token invalid!"]})
    }
};