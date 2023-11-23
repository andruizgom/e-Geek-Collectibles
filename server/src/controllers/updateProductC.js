const { Products } = require('../db');

const updateProducts = async (req) => {
  try {
    const { id } = req.params;
    const { price, available, stock, image } = req.body;
     const [rowsUpdated, [product]] =  await Products.update(
      { price, available, stock, image },
      {
        returning: true,
        where: { id: Number(id) },
      }
    );
    
    if (rowsUpdated === 0) return ({notFound:"Product not found",isProduct:false})
    
    return ({product,isProduct:true})
   
  } catch (error) {
    throw error;
  }
};

module.exports = {
  updateProducts,
};
