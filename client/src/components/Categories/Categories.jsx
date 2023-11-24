import React from 'react';
import categories from '../../assets/categories.svg';

const Categories = () => {
  return (
    <div className="mx-auto w-1/2 mt-10 grid grid-cols-2 gap-4 p-4 bg-gray-100 rounded-md shadow-md">
      <div className="text-center">
        <img
          src={categories}
          alt="Category #1"
          className="w-24 h-24 object-cover  mx-auto mb-2"
        />
        <p className="text-sm  font-semibold">Category #1</p>
      </div>

      <div className="text-center">
        <img
          src={categories}
          alt="Category #2"
          className="w-24 h-24 object-cover  mx-auto mb-2"
        />
        <p className="text-sm  font-semibold">Category #2</p>
      </div>

      <div className="text-center">
        <img
          src={categories}
          alt="Category #3"
          className="w-24 h-24 object-cover  mx-auto mb-2"
        />
        <p className="text-sm  font-semibold">Category #3</p>
      </div>

      <div className="text-center">
        <img
          src={categories}
          alt="Category #4"
          className="w-24 h-24 object-cover  mx-auto mb-2"
        />
        <p className="text-sm  font-semibold">Category #4</p>
      </div>
    </div>
  );
};

export default Categories;
