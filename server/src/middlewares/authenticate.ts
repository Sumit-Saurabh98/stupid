import {Request, Response, NextFunction} from "express";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const protectRoute = async (req:Request, res:Response, next:NextFunction) => {

    try {
        const accessToken = req.cookies._jsonwebtoken_stupid_token;

        if(!accessToken){
            return res.status(4001).json({message:"Unauthorized user - no access token provided", status:false})
        }

        const decodedToken = jwt.verify(accessToken, process.env.JWT_SECRET as string) as jwt.JwtPayload

        const user = await User.findById(decodedToken._id).select("password");

        if(!user){
            return res.status(401).json({ message: "Invalid token", status: false });
        }

        req.user = user;

        next();
    } catch (error: any) {
        console.log(`Error in authenticate middleware: ${error.message}`)
        res.status(401).json({message:"Unauthorized - invalid token provided", status: false})
    }

}