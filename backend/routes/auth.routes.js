
import express from 'express';
import {checkUser, createUser,passwordUpdate,getUser, updateUser} from '../controller/auth.controller.js';
import { googleLogin } from '../controller/google.controller.js';
import { upload } from "../middlewares/upload.js";
const route=express.Router();

route.get("/",(req,res)=>{
    res.send("hi mahajan")
})

route.post("/register",createUser);
route.post("/login",checkUser);
route.put("/change-password",passwordUpdate);
route.get("/user-get",getUser)

route.put("/update-user", upload.single("image"), updateUser);
route.post("/google",googleLogin)
// route.get("/getuser")

export default route;
