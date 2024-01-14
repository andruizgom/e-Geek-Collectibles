import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setSearchTerm, searchProducts } from "../../redux/actions/index";

export default function SearchBar() {
  const dispatch = useDispatch();
  const [searchInput, setSearchInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(setSearchTerm(searchInput));
    dispatch(searchProducts());
    setSearchInput("");
  };

  return (
    <div className="mt-8 flex items-center justify-center sm:mx-4 md:mx-20">
      <form className="w-full" onSubmit={handleSubmit}>
        <label
          htmlFor="default-search"
          className="sr-only mb-2 text-sm font-medium text-gray-900"
        >
          Search
        </label>
        <div className="relative">
          <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-3"></div>
          <input
            type="search"
            id="default-search"
            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-4 ps-10 text-sm text-gray-900 focus:border-red-600 focus:ring-red-600"
            placeholder="Search for a collectible..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            required
          />
          <button
            type="submit"
            className="absolute bottom-2.5 end-2.5 rounded-lg bg-green-500 px-4 py-2 text-sm font-medium text-white hover:bg-green-600 focus:outline-none focus:ring-4 focus:ring-green-300 "
          >
            Search
          </button>
        </div>
      </form>
    </div>
  );
}
