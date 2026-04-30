import mongoose, { Types } from "mongoose";
// import { string } from "zod";

const location=mongoose.Schema({
    shop_name:{
         type: String,
    required: true,
    },
    shop_area:{
         type: String,
    required: true,
    },
    city:{
        type: String,
    required: true,
    }
},{
    timestamps:true
})

export const Location=mongoose.model("Location",location);
