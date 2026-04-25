import express from 'express';
import dotenv from 'dotenv';
import auth from './routes/auth.routes.js';
import shoes from './routes/shoes.routes.js';
import bodyParser from 'body-parser';
import cors from 'cors';
import db from './config/db.js';
import { addCart } from './controller/userCart.controller.js';
import { getNotifications } from './controller/notification.controller.js';
import path from "path";

dotenv.config();
const app=express();

app.use(cors())
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

db();
app.get("/",(req,res)=>{
    res.send("hi i am rohit");
});

app.use("/auth",auth)
app.use("/shoes",shoes)
app.post("/add-cart",addCart)
app.get("/notification",getNotifications);
const port=process.env.PORT;
const ip=process.env.IP;

app.listen(port,"0.0.0.0",()=>{
    console.log(`sever runin on http://${ip}:${port}`);
});

