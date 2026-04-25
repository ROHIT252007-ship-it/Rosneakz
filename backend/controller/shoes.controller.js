import Shoes from "../model/shoes.modal.js"




export const getShoes = async (req, res) => {
    try {

        const shoesdata = await Shoes.find();
        if (shoesdata.length > 0 ) {

            res.status(200).json(shoesdata)
        } else {
            res.status(404).json({ message: "Data Not found", error: true })
        }

    } catch (error) {
        res.status(500).json({ message: "server error", error: true })
    }
}




// export const createShoes = (req, res) => {
//     try{

//         const shoes = new Shoes(req.body);
//         shoes.save();
//         return req.body;
//     }catch(error){
//         res.send
//     }
// }