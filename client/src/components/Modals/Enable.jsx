import { useEffect, useState } from "react";
import { updateProduct } from "../../redux/actions/index";
import { useDispatch, useSelector } from "react-redux";
import { FaTrashRestore } from "react-icons/fa";

const Enable = ({ handleOpenModal }) => {
  const dispatch = useDispatch();
  const productsDetail = useSelector(({ productsDetail }) => productsDetail);
  const idProduct = useSelector(({ idProduct }) => idProduct);
  const updateState = useSelector(({ updateState }) => updateState);
  const adSearchTerm = useSelector(({ adSearchTerm }) => adSearchTerm);
  const productAvailable = useSelector(
    ({ productAvailable }) => productAvailable,
  );
  const [available, setAvailable] = useState(null);
  const handleAvailable = () => {
    setAvailable(!available);
    const updatedProduct = { ...productsDetail, available: !available };
    if (adSearchTerm) {
      dispatch(updateProduct(updatedProduct, idProduct, !updateState, true));
      handleOpenModal("");
      return;
    }
    dispatch(updateProduct(updatedProduct, idProduct, !updateState, null));
    handleOpenModal("");
  };

  useEffect(() => {
    setAvailable(productAvailable);
  }, []);
  return (
    <>
      <div className="fixed left-0 top-0 z-40 h-full w-full bg-black opacity-50"></div>
      <div
        id="deleteModal"
        tabIndex="-1"
        aria-hidden="true"
        className="fixed left-1/2 top-1/2 z-50 -translate-x-1/2 -translate-y-1/2 transform items-center justify-center"
      >
        <div className="relative max-h-full w-full max-w-md p-4">
          <div className="relative rounded-lg bg-white p-4 text-center shadow dark:bg-gray-800 sm:p-5">
            <button
              onClick={() => handleOpenModal("")}
              type="button"
              className="absolute right-2.5 top-2.5 ml-auto inline-flex items-center rounded-lg bg-transparent p-1.5 text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white"
              data-modal-toggle="deleteModal"
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
            </button>

            <FaTrashRestore className="mx-auto mb-3.5 h-11 w-11 text-gray-400 dark:text-gray-500" />

            <p className="mb-4 text-gray-500 dark:text-gray-300">
              do you want to restore this {productsDetail.title}
            </p>
            <div className="flex items-center justify-center space-x-4">
              <button
                onClick={() => handleOpenModal("")}
                data-modal-toggle="deleteModal"
                type="button"
                className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-900 focus:z-10 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:border-gray-500 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-600"
              >
                No, cancel
              </button>

              <button
                onClick={handleAvailable}
                type="submit"
                className="rounded-lg bg-green-400 px-3 py-2 text-center text-sm font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-4 focus:ring-green-300 dark:bg-green-400 dark:hover:bg-green-600 dark:focus:ring-green-900"
              >
                Yes, I'm sure
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Enable;
