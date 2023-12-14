import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setSearchTerm,
  searchProducts,
  clearSearch,
} from "../../redux/actions/index";

const AdSearchBar = () => {
  const dispatch = useDispatch();
  const adSearchTerm = useSelector(({ adSearchTerm }) => adSearchTerm);
  const updateState = useSelector(({ updateState }) => updateState);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        dispatch(clearSearch());
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dispatch]);

  const onChange = (event) => {
    const value = event.target.value;
    dispatch(setSearchTerm("", value));
    if (value.length >= 3) {
      dispatch(searchProducts(value));
    } else if (value.length === 0) {
      dispatch(clearSearch());
    }
  };

  useEffect(() => {
    dispatch(searchProducts(adSearchTerm));
  }, [updateState]);

  return (
    <div className="w-full md:w-1/2">
      <div className="relative w-full">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          <svg
            aria-hidden="true"
            className="h-5 w-5 text-gray-500 dark:text-gray-400"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <input
          className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2 pl-10 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
          type="text"
          placeholder="Search..."
          value={adSearchTerm === null ? "" : adSearchTerm}
          onChange={onChange}
        />
      </div>
    </div>
  );
};

export default AdSearchBar;
