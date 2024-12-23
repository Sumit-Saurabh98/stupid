import express, { Application, Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import connectDB from "./config/db.js"
import passport from './config/passport.config.js';
import session from 'express-session';
dotenv.config();


import authRouter from "./routes/user.route.js"

const PORT = process.env.PORT || 5001


const app: Application = express();

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

app.use(
  session({
    secret: process.env.SESSION_SECRET || 'your-secret-key',
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use('/api/auth', authRouter);

app.listen(PORT, ()=>{
    console.log(`Listening on ${PORT}`);
    connectDB();
})
