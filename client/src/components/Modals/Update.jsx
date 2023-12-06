import { useDispatch, useSelector } from "react-redux"
import { getProductById,updateProduct } from '../../redux/actions/index'
import { useUploadImage } from './service/useUploadImage'
import {validateProduct} from './service/validate'
import { useForm } from "react-hook-form";
import { useEffect } from "react"

const Update = ({ idProduct, ModalUpdate }) => {
    const {
        register,
        formState: { errors },
        handleSubmit,
        reset
    } = useForm();
    const dispatch = useDispatch()
    const productsDetail = useSelector(({ productsDetail }) => productsDetail)
  const { imageUrl, uploadImage } = useUploadImage();



    const onSubmit = handleSubmit(async (product) => {
    let newProduct = validateProduct(productsDetail, product)
    if (typeof newProduct?.image === "object") {
      await uploadImage(product?.image)
      newProduct = { ...newProduct, image: imageUrl }
    }
    dispatch(updateProduct(newProduct, productsDetail.id))
  })

    useEffect(() => {
        dispatch(getProductById(idProduct))
    }, [idProduct])

    return (
        <>
      <div
        className="fixed top-0 left-0 w-full h-full bg-black opacity-50 z-40"
      ></div>

      <div
        id="updateProductModal"
        tabIndex="-1"
        aria-hidden="true"
        className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 justify-center items-center"
      >
        <div className="relative p-4 w-full max-w-2xl max-h-full">
          <div className="relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
            <div className="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Update Product
              </h3>
              <button
                onClick={ModalUpdate}
                type="button"
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                data-modal-toggle="updateProductModal"
              >
                <svg
                  aria-hidden="true"
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>

                    <form action="" onSubmit={onSubmit}>
                        <div className="grid gap-4 mb-4 sm:grid-cols-2">
                            <div>
                                <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
                                <input type="text" name="name" id="name" defaultValue={productsDetail.title} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" {...register("title")} />
                            </div>

                            <div>
                                <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Manufacturer</label>
                                <input type="text" name="name" id="name" defaultValue={productsDetail.manufacturer} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                    {...register("manufacturer")}
                                />
                            </div>

                            <div>
                                <label htmlFor="author" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Author</label>
                                <input type="text" name="author" id="author" defaultValue={productsDetail.author} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                    {...register("author")}
                                />
                            </div>

                            <div>
                                <label htmlFor="image" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Image</label>
                                <input type="file" name="image" id="image" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                    {...register("image")}
                                    />
                            </div>

                            <div><label htmlFor="category" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Category</label>
                                <select id="category"
                                    {...register("category", {
                                        required: 'Category is required',
                                    })}
                                    defaultValue={productsDetail.category} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                                    <option defaultValue={productsDetail.category}>{productsDetail.category}</option>
                                    <option value="Games">Games</option>
                                    <option value="Statues">Statues</option>
                                    <option value="Figures">Figures</option>
                                    <option value="Outfit And Accesories">Outfit And Accesories</option>
                                </select>
                            </div>

                            <div>
                                <label htmlFor="stok" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Stok</label>
                                <input type="number" name="stok" id="stok" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" defaultValue={productsDetail.stock} {...register("stock", {
                                    required: 'Stock is required',
                                    min: {
                                        value: 0,
                                        message: 'Stock must be a non-negative number',
                                    },
                                })} />

                                {errors.stock && (
                                    <p className="text-red-500 text-xs italic">
                                        {errors.stock.message}
                                    </p>
                                )}
                            </div>



                            <div>
                                <label htmlFor="price" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Price</label>
                                <input type="number" defaultValue={productsDetail.price} name="price" id="price" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                    {...register("price", {
                                        required: 'Price is required',
                                        pattern: {
                                            value: /^[0-9]+(\.[0-9]{1,2})?$/,
                                            message: 'Invalid price format',
                                        },
                                    })}
                                />
                                {errors.price && (
                                    <p className="text-red-500 text-xs italic">
                                        {errors.price.message}
                                    </p>
                                )}
                            </div>


                            <div className="sm:col-span-2"><label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label><textarea
                                name="description"
                                {...register("description")}
                                defaultValue={productsDetail.description} id="description" rows="5" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"></textarea></div>
                        </div>

                        <div className="flex items-center space-x-4">
                            <button type="submit" className="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Update product</button>

                            {/* <button type="button" className="text-red-600 inline-flex items-center hover:text-white border border-red-600 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900">
                                <svg className="mr-1 -ml-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                                </svg>
                                Delete
                            </button> */}
                        </div>
                    </form>
                </div>
            </div>
        </div>
            </>
    )
}
export default Update