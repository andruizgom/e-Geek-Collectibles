import { useDispatch, useSelector } from "react-redux"
import { getProductById } from '../../redux/actions/index'
import { useEffect } from "react"

const Read = ({ ModalRead, idProduct }) => {
    const productsDetail = useSelector(({ productsDetail }) => productsDetail)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getProductById(idProduct))
    }, [idProduct])

    return (
        <>
            <div
                className="fixed top-0 left-0 w-full h-full bg-black opacity-50 z-40"
            ></div>
            <div id="readProductModal" tabIndex="-1" aria-hidden="true" className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 justify-center items-center">

                <div className="relative p-4 w-full max-w-xl max-h-full">
                    <div className="relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">

                        <div className="flex justify-between mb-4 rounded-t sm:mb-5">
                            <div className="text-lg text-gray-900 md:text-xl dark:text-white">
                                <h3 className="font-semibold ">{productsDetail.title}</h3>
                                <p className="font-bold">{productsDetail.price}$</p>
                            </div>
                            <div>
                                <button onClick={ModalRead} type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 inline-flex dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="readProductModal">
                                    <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                    </svg>
                                    <span className="sr-only">Close modal</span>
                                </button>
                            </div>
                        </div>
                        <dl><dt className="mb-2 font-semibold leading-none text-gray-900 dark:text-white">Details</dt><dd className="mb-4 font-light text-gray-500 sm:mb-5 dark:text-gray-400">{productsDetail.description}</dd><dt className="mb-2 font-semibold leading-none text-gray-900 dark:text-white">Category</dt><dd className="mb-4 font-light text-gray-500 sm:mb-5 dark:text-gray-400">{productsDetail.category}</dd></dl>

                        {/* acá */}
                        <img
                            src={productsDetail.image}
                            alt=""
                            className="w-48 mx-auto mb-4 object-cover rounded-lg"
                        />

                        <div className="flex justify-between items-center">
                            <div className="flex items-center space-x-3 sm:space-x-4">
                                {/* <button type="button" className="text-white inline-flex items-center bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                                <svg aria-hidden="true" className="mr-1 -ml-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
                                <path fillRule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clipRule="evenodd" />
                                </svg>
                                Edit
                            </button> */}

                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Read