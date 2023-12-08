export const validateProduct = (productDetail, updateProduct) => {
  if (updateProduct.title === "") {
    updateProduct.title = productDetail.title
  }

  if (updateProduct.description === "") {
    updateProduct.description = productDetail.description
  }

  if (updateProduct.author === "") {
    updateProduct.author = productDetail.author
  }

  if (updateProduct.category === "") {
    updateProduct.category = productDetail.category
  }

  if (updateProduct.manufacturer === "") {
    updateProduct.manufacturer = productDetail.manufacturer
  }

  if (updateProduct.image.length === 0) {
    updateProduct.image = productDetail.image
  }

  return updateProduct
}