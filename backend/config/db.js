import mongoose from "mongoose";

const db = async () => {
    const connectString = process.env.DB_CONNECTION;
    if(connectString){
        console.log(connectString)
    }
    await mongoose.connect(connectString)
        .then(() => {
            console.log("connect");
        })
}
export default db