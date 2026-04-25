import mongoose from "mongoose";

const Schema=mongoose.Schema;

const userSchema =new Schema({
    name:{
            required:true,
            type:String
        },
    email:{
        required:true,
        type:String,
        unique: true
    },
    password:{
            type:String,
            default:null
        },
    image:{
            type:String,
            default:null
    }
}, {
  timestamps: { createdAt: true, updatedAt: false }
})

const User=mongoose.model("User",userSchema)

export default User;