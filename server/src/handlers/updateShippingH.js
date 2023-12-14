const {updateShippingC}=require("../controllers/updateShippingC");

const updateShippingH=async(req,res)=>{
    try{
        const updatedUser = await updateShippingC(req, res);
        res.status(200).json({ message: 'Información de envío actualizada correctamente', user: updatedUser });
    }catch(error){
        console.error(error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
}

module.exports={
        updateShippingH
}