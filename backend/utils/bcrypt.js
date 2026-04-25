import bcrypt  from 'bcrypt';


export const hashPssword=async(password)=>{
    const slat=10;
    return await bcrypt.hash(password,slat)
}

export const comparePassword=async(password,hashPssword)=>{
    return await bcrypt.compare(password,hashPssword);

}

