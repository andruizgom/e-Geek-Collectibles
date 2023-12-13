import { FaTrashRestore } from "react-icons/fa";

const Restore = ({ handleOptions }) => {
  return (
    <button
      onClick={() => handleOptions("restore")}
      type="button"
      data-modal-target="deleteModal"
      data-modal-toggle="deleteModal"
      className="flex w-full items-center px-4 py-2 text-green-500 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-green-400"
    >
      <FaTrashRestore className="mr-2 h-4 w-4" />
      Restore
    </button>
  );
};
export default Restore;
