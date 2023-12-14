import { useSelector } from "react-redux";

const Read = ({ handleOpenModal }) => {
  const productsDetail = useSelector(({ productsDetail }) => productsDetail);

  return (
    <>
      <div className="fixed left-0 top-0 z-40 h-full w-full bg-black opacity-50"></div>
      <div
        id="readProductModal"
        tabIndex="-1"
        aria-hidden="true"
        className="fixed left-1/2 top-1/2 z-50 -translate-x-1/2 -translate-y-1/2 transform items-center justify-center"
      >
        <div className="relative max-h-full w-full max-w-xl p-4">
          <div className="relative rounded-lg bg-white p-4 shadow dark:bg-gray-800 sm:p-5">
            <div className="mb-4 flex justify-between rounded-t sm:mb-5">
              <div className="text-lg text-gray-900 dark:text-white md:text-xl">
                <h3 className="font-semibold ">{productsDetail.title}</h3>
                <p className="font-bold">{productsDetail.price}$</p>
              </div>
              <div>
                <button
                  onClick={() => handleOpenModal("")}
                  type="button"
                  className="inline-flex rounded-lg bg-transparent p-1.5 text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white"
                  data-modal-toggle="readProductModal"
                >
                  <svg
                    aria-hidden="true"
                    className="h-5 w-5"
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
            </div>
            <dl>
              <dt className="mb-2 font-semibold leading-none text-gray-900 dark:text-white">
                Details
              </dt>
              <dd className="mb-4 font-light text-gray-500 dark:text-gray-400 sm:mb-5">
                {productsDetail.description}
              </dd>
              <dt className="mb-2 font-semibold leading-none text-gray-900 dark:text-white">
                Category
              </dt>
              <dd className="mb-4 font-light text-gray-500 dark:text-gray-400 sm:mb-5">
                {productsDetail.category}
              </dd>
            </dl>

            {/* acá */}
            <img
              src={productsDetail.image}
              alt=""
              className="mx-auto mb-4 w-48 rounded-lg object-cover"
            />

            <div className="flex items-center justify-between">
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
  );
};
export default Read;
