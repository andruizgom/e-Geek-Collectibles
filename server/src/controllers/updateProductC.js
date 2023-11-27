const { Products } = require('../db');

const updateProducts = async (req) => {
  try {
    const { id } = req.params;
    const { price, available, stock, image } = req.body;
    const notFound = "Product not found";

     const [rowsUpdated, [product]] =  await Products.update(
      { price, available, stock, image },
      {
        returning: true,
        where: { id: Number(id) },
      }
    );
    
    if (rowsUpdated === 0) return ({notFound,isProduct:false})
    
    return ({product,isProduct:true})
   
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = {
  updateProducts,
};
