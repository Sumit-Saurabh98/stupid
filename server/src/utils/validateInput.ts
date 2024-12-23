import { Request, Response } from "express";
import { passwordValidator } from "./passwordValidator.js";

export const validateInput = async (req:Request, res:Response, username:string, email:string, password:string) : Promise<Response<any, Record<string, any>> | undefined> => {

     if(!username && !email && !password){
            return res.status(401).json({message: "All fields are required", status: false});
        }

        if(username.length < 5){
            return res.status(401).json({message: "username length should be 5 at least", status: false});
        }

        if(!passwordValidator(password)){
            return res.status(401).json({message: "strong password is required", status: false});
        }
}