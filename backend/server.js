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
import { getLocations, getShop } from './controller/location.controller.js';

dotenv.config();
const app=express();

app.use(cors())
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));
app.use(express.static(path.join(process.cwd(), "public")));

db();
app.get("/",(req,res)=>{
    res.send("hi i am rohit");
});
app.use('/models',
  express.static(path.join(process.cwd(), '3dmodels'), {
    setHeaders: (res, filePath) => {
      if (filePath.endsWith('.glb')) {
        res.setHeader('Content-Type', 'model/gltf-binary');
      }
    },
  })
);

app.use("/auth",auth)
app.use("/shoes",shoes)
app.post("/add-cart",addCart)
app.get("/notification",getNotifications);
app.get("/location",getLocations);
app.get("/get-shop",getShop)
app.get('/map-picker', (req, res) => {
  res.sendFile(path.join(process.cwd(), "public", "index.html"));
});


const port=process.env.PORT;
const ip=process.env.IP;

app.listen(port,"0.0.0.0",()=>{
    console.log(`sever runin on http://${ip}:${port}`);
});

