import { useDispatch } from "react-redux";
import { getProductById, getIdAvailable } from "../../redux/actions/index";
import Delete from "../Buttons/Delete";
import Restore from "../Buttons/Restore";

const AdDropDrown = ({ id, available, handleOpenModal }) => {
  const dispatch = useDispatch();
  const handleOptions = async (type) => {
    switch (type) {
      case "update":
        await dispatch(getProductById(id));
        dispatch(getIdAvailable(id, available));
        handleOpenModal("update");
        break;
      case "preview":
        await dispatch(getProductById(id));
        dispatch(getIdAvailable(id, available));
        handleOpenModal("preview");
        break;
      case "delete":
        await dispatch(getProductById(id));
        dispatch(getIdAvailable(id, available));
        handleOpenModal("delete");
        break;
      case "restore":
        await dispatch(getProductById(id));
        dispatch(getIdAvailable(id, available));
        handleOpenModal("restore");
        break;
      default:
        handleOpenModal("");
        break;
    }
  };
  return (
    <div
      id={id}
      className=" z-10 w-44 divide-y divide-gray-100 rounded bg-white shadow dark:divide-gray-600 dark:bg-gray-700"
    >
      <ul className="py-1 text-sm">
        <li>
          <button
            onClick={() => handleOptions("update")}
            type="button"
            data-modal-target="updateProductModal"
            data-modal-toggle="updateProductModal"
            className="flex w-full items-center px-4 py-2 text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white"
          >
            <svg
              className="mr-2 h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"
              />
            </svg>
            Edit
          </button>
        </li>
        <li>
          <button
            onClick={() => handleOptions("preview")}
            type="button"
            data-modal-target="readProductModal"
            data-modal-toggle="readProductModal"
            className="flex w-full items-center px-4 py-2 text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white"
          >
            <svg
              className="mr-2 h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
              />
            </svg>
            Preview
          </button>
        </li>
        <li>
          {available ? (
            <Delete handleOptions={handleOptions} />
          ) : (
            <Restore handleOptions={handleOptions} />
          )}
        </li>
      </ul>
    </div>
  );
};
export default AdDropDrown;
