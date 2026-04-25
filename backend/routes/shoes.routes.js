
import express from 'express';
import { getShoes} from '../controller/shoes.controller.js';

const route=express.Router();

route.get("/",(req,res)=>{
    res.send("hi mahajan")
})


route.get("/get",getShoes);




export default route;
