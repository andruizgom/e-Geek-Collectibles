import { useState } from "react";
import { ordersFilters } from "../../redux/actions/index";
import { useDispatch, useSelector } from "react-redux";

const AdFilters = ({ options, setOptions, handleClick }) => {
  const handleDateChange = (e) => {
    setOptions({ ...options, createdDate: e.target.value });
  };

  const states = ["All states", "Accepted", "On the way", "Delivered"];

  const handleSelectChange = (e) => {
    setOptions({ ...options, state: e.target.value });
  };

  // const handleClick = () => {
  //   dispatch(ordersFilters(options));
  // };
  return (
    <>
      <div className="flex flex-col items-center justify-between space-y-3 p-4 md:flex-row md:space-x-4 md:space-y-0">
        <div className="w-full md:w-1/2">
          <div className="relative mb-3 w-full md:mr-2 md:w-52">
            <input
              className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2 pl-10 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
              type="date"
              onChange={handleDateChange}
            />
          </div>
        </div>
        <div className="flex w-full flex-shrink-0 flex-col items-stretch justify-end space-y-2 md:w-auto md:flex-row md:items-center md:space-x-3 md:space-y-0">
          <button
            onClick={handleClick}
            type="button"
            id="createProductModalButton"
            data-modal-target="createProductModal"
            data-modal-toggle="createProductModal"
            className="flex items-center justify-center rounded-lg bg-primary-700 px-4 py-2 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
          >
            Apply
          </button>

          <div
            id="filterDropdown"
            className="flex w-full items-center space-x-3 md:w-auto"
          >
            <select
              value={options.state}
              onChange={handleSelectChange}
              className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
            >
              {states.map((value) => (
                <option key={value} value={value}>
                  {value}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </>
  );
};
export default AdFilters;
