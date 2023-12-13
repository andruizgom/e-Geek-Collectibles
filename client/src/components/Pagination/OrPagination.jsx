import { useState } from "react";
import { setOrdersPage } from "../../redux/actions/index";
import { useDispatch, useSelector } from "react-redux";
const OrPagination = ({ indexPage }) => {
  const ordersPage = useSelector(({ ordersPage }) => ordersPage);
  const [currentPage, setCurrentPage] = useState(1);
  const pages = [
    { page: ordersPage },
    { page: ordersPage + 1 },
    { page: ordersPage + 2 },
    { page: ordersPage + 3 },
    { page: ordersPage + 4 },
  ];
  const dispatch = useDispatch();
  const selectPage = (page) => {
    setCurrentPage(page);
    dispatch(setOrdersPage(page));
  };
  const nextPage = () => {
    dispatch(setOrdersPage(ordersPage + 1));
    setCurrentPage(ordersPage + 1);
  };
  const prevPage = () => {
    dispatch(setOrdersPage(ordersPage - 1));
    setCurrentPage(ordersPage - 1);
  };

  return (
    <>
      <nav
        className="flex flex-col items-start justify-between space-y-3 p-4 md:flex-row md:items-center md:space-y-0"
        aria-label="Table navigation"
      >
        <span className="m-1 text-sm font-normal text-gray-500 dark:text-gray-400">
          Showing
          <span className="m-1 font-semibold text-gray-900 dark:text-white">
            {ordersPage <= 15 && (
              <>
                {indexPage && indexPage[0] && indexPage[0].product_id
                  ? indexPage[0].product_id
                  : 0}

                {" - "}
                {indexPage &&
                indexPage.length > 0 &&
                indexPage[indexPage.length - 1] &&
                indexPage[indexPage.length - 1].product_id
                  ? indexPage[indexPage.length - 1].product_id
                  : 0}
              </>
            )}
          </span>
        </span>

        <ul className="inline-flex items-stretch -space-x-px">
          {ordersPage > 1 && (
            <li onClick={prevPage}>
              <a className="ml-0 flex h-full cursor-pointer items-center justify-center rounded-l-lg border border-gray-300 bg-white px-3 py-1.5 text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                <svg
                  className="h-5 w-5"
                  aria-hidden="true"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
            </li>
          )}

          {indexPage.length > 0 &&
            indexPage.length === 10 &&
            pages.map(({ page }) => (
              <li key={page}>
                <a
                  onClick={() => selectPage(page)}
                  className={`flex cursor-pointer items-center justify-center border border-gray-300 bg-white px-3 py-2 text-sm leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white ${
                    currentPage === page &&
                    "z-10 flex items-center justify-center border border-primary-300 bg-primary-500 px-3 py-2 text-sm leading-tight text-black hover:bg-primary-100 hover:text-primary-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white"
                  } `}
                >
                  {page}
                </a>
              </li>
            ))}
          {indexPage.length > 0 && indexPage.length === 10 && (
            <li onClick={nextPage}>
              <a className="flex h-full cursor-pointer items-center justify-center rounded-r-lg border border-gray-300 bg-white px-3 py-1.5 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                <svg
                  className="h-5 w-5"
                  aria-hidden="true"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
            </li>
          )}
        </ul>
      </nav>
    </>
  );
};
export default OrPagination;
