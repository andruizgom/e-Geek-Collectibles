import React from "react";
import categories from "../../assets/categories.svg";

export default function Categories() {
  return (
    <div className="mx-auto mt-10 grid w-1/2 grid-cols-2 gap-4 rounded-md bg-gray-100 p-4 shadow-md">
      <div className="text-center">
        <img
          src={categories}
          alt="Category #1"
          className="mx-auto mb-2 h-24  w-24 object-cover"
        />
        <p className="text-sm  font-semibold">Category #1</p>
      </div>

      <div className="text-center">
        <img
          src={categories}
          alt="Category #2"
          className="mx-auto mb-2 h-24  w-24 object-cover"
        />
        <p className="text-sm  font-semibold">Category #2</p>
      </div>

      <div className="text-center">
        <img
          src={categories}
          alt="Category #3"
          className="mx-auto mb-2 h-24  w-24 object-cover"
        />
        <p className="text-sm  font-semibold">Category #3</p>
      </div>

      <div className="text-center">
        <img
          src={categories}
          alt="Category #4"
          className="mx-auto mb-2 h-24  w-24 object-cover"
        />
        <p className="text-sm  font-semibold">Category #4</p>
      </div>
    </div>
  );
}
