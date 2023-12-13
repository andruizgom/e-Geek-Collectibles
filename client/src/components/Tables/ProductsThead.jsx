const ProductsThead = () => {
  return (
    <>
      <thead className="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
        <tr>
          <th scope="col" className="px-4 py-3">
            Id
          </th>
          <th scope="col" className="px-4 py-4">
            Product name
          </th>
          <th scope="col" className="px-4 py-3">
            Image
          </th>
          <th scope="col" className="px-4 py-3">
            Description
          </th>
          <th scope="col" className="px-4 py-3">
            Price
          </th>
          <th scope="col" className="px-4 py-3">
            <span className="not-sr-only">Actions</span>
          </th>
        </tr>
      </thead>
    </>
  );
};
export default ProductsThead