import AdDropDrown from "../DropDown/AdDropDown";
import { useState } from "react";

const ProductsTbody = ({
  id,
  title,
  image,
  price,
  available,
  description,
  handleOpenModal,
}) => {
  const [dropDown, setDropDown] = useState({});
  const handleDropDown = () => {
    setDropDown((prevDropDown) => ({
      ...prevDropDown,
      [id]: !prevDropDown[id],
    }));
  };
  return (
    <>
      <tr className="border-b dark:border-gray-700">
        <th
          scope="row"
          className="whitespace-nowrap px-4 py-3 font-medium text-gray-900 dark:text-white"
        >
          {id}
        </th>
        <td className="px-4 py-3">{title}</td>
        <td className="px-4 py-3">{image}</td>
        <td className="max-w-[12rem] truncate px-4 py-3">{description}</td>
        <td className="px-4 py-3">{price}$</td>
        <td className="flex items-center justify-end px-4 py-3">
          <button
            onClick={handleDropDown}
            id={id}
            data-dropdown-toggle={id}
            className="dark:hover-bg-gray-800 inline-flex items-center rounded-lg p-1.5 text-center text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-800 focus:outline-none dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-100"
            type="button"
          >
            <svg
              className="h-5 w-5"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
            </svg>
          </button>

          {dropDown[id] && (
            <AdDropDrown
              id={id}
              available={available}
              handleOpenModal={handleOpenModal}
            />
          )}
        </td>
      </tr>
    </>
  );
};
export default ProductsTbody;
