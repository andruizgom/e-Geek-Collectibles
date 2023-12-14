import { useState } from "react";
import { ordersFilters } from "../../redux/actions/index";
import { useDispatch, useSelector } from "react-redux";

const FiltersOrders = () => {
  const dispatch = useDispatch();
  const orders = useSelector(({ ordersFiltered }) => ordersFiltered);
  const ordersPage = useSelector(({ ordersPage }) => ordersPage);
  const pageSize = useSelector(({ pageSizeOrders }) => pageSizeOrders);
  const [options, setOptions] = useState({
    state: "All states",
    createdDate: "",
  });

  const handleDateChange = (e) => {
    setOptions({ ...options, createdDate: e.target.value });
  };

  const states = ["All states", "Accepted", "On the way", "Delivered"];

  const handleSelectChange = (e) => {
    setOptions({ ...options, state: e.target.value });
  };

  const handleClick = () => {
    dispatch(ordersFilters(options));
  };

  console.log(orders.length);

  return (
    <div className="flex w-full flex-wrap items-center p-5 md:w-1/2">
      <div className="relative mb-3 w-full md:mr-2 md:w-52">
        <input
          className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2 pl-10 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
          type="date"
          onChange={handleDateChange}
        />
      </div>
      {options.createdDate.length === 10 && (
        <button
          onClick={handleClick}
          className="rounded-lg bg-primary-500 px-4 py-2 text-white transition duration-300 hover:bg-primary-600"
        >
          Apply
        </button>
      )}
      <div
        id="filterDropdown"
        className="relative  w-full rounded-lg bg-white p-3 shadow dark:bg-gray-700 md:w-56"
      >
        <h6 className="mb-3 text-sm font-medium text-gray-900 dark:text-white">
          State
        </h6>
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
  );
};

export default FiltersOrders;
