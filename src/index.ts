import express, { Application, Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import connectDB from "./config/db.js"
dotenv.config();

import authRouter from "./routes/user.route.js"
import path from "path";

const PORT = process.env.PORT || 8082


const app: Application = express();

const __dirname = path.resolve();

app.use(express.json({ limit: 10000 }));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.CLIENT_URL as string,
    credentials: true,
  })
);


app.get('/test', (req:Request, res:Response) =>{
    res.send("<h1>Server is working fine................................................................</h1>");
})

app.use('/api/auth', authRouter);

if(process.env.NODE_ENV === "production"){
  app.use(express.static(path.join(__dirname, "client", "dist")));
  app.get("*", (req: Request, res: Response) => {
      res.sendFile(path.resolve(__dirname, "client", "dist", "index.html"));
  })
}

app.listen(PORT, ()=>{
    console.log(`Listening on ${PORT}`);
    connectDB();
})
