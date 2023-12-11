import { useState } from "react";
import { ordersFilters } from "../../redux/actions/index";
import { useDispatch, useSelector } from "react-redux";

const FiltersOrders = () => {
  const dispatch = useDispatch();
  const orders = useSelector(({ ordersFiltered }) => ordersFiltered);
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
    dispatch(ordersFilters(options));
  };

  const handleClick = () => {
    dispatch(ordersFilters(options));
  };

  return (
    <div className="w-full p-5 md:w-1/2">
      <div className="relative w-full">
        <input
          className="block w-52 rounded-lg border border-gray-300 bg-gray-50 p-2 pl-10 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
          type="date"
          onChange={handleDateChange}
        />
      </div>
      <div
        id="filterDropdown"
        className="z-10  w-56 rounded-lg bg-white p-3 shadow dark:bg-gray-700"
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
      {options.createdDate.length === 10 && options.state === "All states" && (
        <button onClick={handleClick}>Apply</button>
      )}
    </div>
  );
};

export default FiltersOrders;
