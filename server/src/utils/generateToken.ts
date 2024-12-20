import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config()
export const generateToken = ({_id, username}: { _id: string; username: string }): { accessToken: string } => {
    const accessToken = jwt.sign({_id, username}, process.env.JWT_SECRET as string, {
        expiresIn: "1d"
    })
    return { accessToken };
}