const { Products } = require('../db');

const updateProducts = async (req) => {
  try {
    const { id } = req.params;
    const {
      category,
      description,
      available,
      price,
      stock,
      author,
      manufacturer,
      title,
      image,
    } = req.body;
    const notFound = "Product not found";

     const [rowsUpdated, [product]] =  await Products.update(
      { price, available, stock, image,author,available,description,category,title,manufacturer },
      {
        returning: true,
        where: { id: Number(id) },
      }
    );
    
    if (rowsUpdated === 0) return ({notFound,isProduct:false})
    
    return ({message:"product updated",isProduct:true})
   
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = {
  updateProducts,
};
