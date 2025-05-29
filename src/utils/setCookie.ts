import { Response } from "express"
import dotenv from "dotenv";
dotenv.config();

export const setCookie = (res:Response, accessToken:string) : void => {

    res.cookie("_jsonwebtoken_stupid_token", accessToken, {
        httpOnly: true,
        sameSite: "strict",
        secure: process.env.NODE_ENV !== "production",
        maxAge: 1 * 60 * 60 * 10000
    } )

}
