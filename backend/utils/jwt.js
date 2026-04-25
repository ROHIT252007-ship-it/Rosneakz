import jwt from 'jsonwebtoken';


export  const createToken=(email,id)=>{

    const token=jwt.sign({email,id},process.env.JWTKEY,{expiresIn:"365d"});
    return token;
}

export const verifyToken=async(token)=>{
    const data= await jwt.verify(token,process.env.JWTKEY);
    return data;
}
