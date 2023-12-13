import { useForm } from "react-hook-form";
import { useUploadImage } from "./service/useUploadImage.js";
import { createProduct, getProducts } from "../../redux/actions/index.js";
import { useDispatch, useSelector } from "react-redux";

const Create = ({ handleOpenModal }) => {
  const dispatch = useDispatch();
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();

  const { uploadImage } = useUploadImage();
  const adminPage = useSelector(({ adminPage }) => adminPage);

  const createNewProduct = handleSubmit(async (product) => {
    try {
      const { image, status } = await uploadImage(product?.image);
      if (status === 200) {
        const newProduct = { ...product, image: image };
        dispatch(createProduct(newProduct));
        reset();
        dispatch(getProducts(adminPage));
        handleOpenModal("");
        return;
      } else {
        alert("Image upload failed");
        return;
      }
    } catch (error) {
      alert(error.message);
    }
  });

  return (
    <>
      <div className="fixed left-0 top-0 z-40 h-full w-full bg-black opacity-50"></div>

      <div
        id="createProductModal"
        tabIndex="-1"
        aria-hidden="true"
        className="fixed left-1/2 top-1/2 z-50 -translate-x-1/2 -translate-y-1/2 transform items-center justify-center"
      >
        <div className="relative max-h-full w-full max-w-2xl p-4">
          <div className="relative rounded-lg bg-white p-4 shadow dark:bg-gray-800 sm:p-5">
            <div className="mb-4 flex items-center justify-between rounded-t border-b pb-4 dark:border-gray-600 sm:mb-5">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Add Product
              </h3>
              <button
                onClick={() => handleOpenModal("")}
                type="button"
                className="ml-auto inline-flex items-center rounded-lg bg-transparent p-1.5 text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white"
                data-modal-target="createProductModal"
                data-modal-toggle="createProductModal"
              >
                <svg
                  aria-hidden="true"
                  className="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>

            <form action="" onSubmit={createNewProduct}>
              <div className="mb-4 grid gap-4 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="title"
                    className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Title
                  </label>
                  <input
                    type="text"
                    name="title"
                    id="title"
                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-600 focus:ring-primary-600 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
                    {...register("title", {
                      required: "title is required",
                      maxLength: {
                        value: 50,
                        message: "Title must not exceed 50 characters",
                      },
                    })}
                    placeholder="Type product name"
                  />
                  {errors.title && (
                    <p className="text-xs italic text-red-500">
                      {errors.title.message}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="manufacturer"
                    className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Manufacturer
                  </label>
                  <input
                    type="text"
                    name="manufacturer"
                    id="manufacturer"
                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-600 focus:ring-primary-600 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
                    {...register("manufacturer", {
                      required: "Manufacturer is required",
                    })}
                  />
                  {errors.manufacturer && (
                    <p className="pt-1 text-xs italic text-red-500">
                      {errors.manufacturer.message}
                    </p>
                  )}
                </div>

                <div className="mb-2">
                  <label
                    htmlFor="available"
                    className="block text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Available
                  </label>

                  <div className="flex items-center">
                    <input
                      type="radio"
                      name="available"
                      id="true"
                      value={true}
                      {...register("available", {
                        required: "Available status is required",
                      })}
                      className="mr-2 rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-600 focus:ring-primary-600 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
                    />
                    <label htmlFor="true" className="text-sm">
                      Yes
                    </label>

                    <input
                      type="radio"
                      name="available"
                      id="false"
                      value={false}
                      {...register("available", {
                        required: "Available status is required",
                      })}
                      className="ml-2 rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-600 focus:ring-primary-600 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
                    />
                    <label htmlFor="false" className="p-2 text-sm">
                      No
                    </label>
                  </div>
                  {errors.available && (
                    <p className="text-xs italic text-red-500">
                      {errors.available.message}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="author"
                    className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Author
                  </label>
                  <input
                    type="text"
                    name="author"
                    id="author"
                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-600 focus:ring-primary-600 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
                    {...register("author", {
                      required: "Author is required",
                    })}
                  />
                  {errors.author && (
                    <p className="text-xs italic text-red-500">
                      {errors.author.message}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="image"
                    className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Image
                  </label>
                  <input
                    type="file"
                    name="image"
                    id="image"
                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-600 focus:ring-primary-600 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
                    {...register("image", {
                      required: "Please select an image file.",
                    })}
                  />

                  {errors.image && (
                    <p className="text-xs italic text-red-500">
                      {errors.image.message}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="category"
                    className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Category
                  </label>
                  <select
                    name="category"
                    id="category"
                    {...register("category", {
                      required: "Category is required",
                      validate: (value) =>
                        value !== "Select category" || "Category is required",
                    })}
                    defaultValue={"Select category"}
                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
                  >
                    <option value="Select category" disabled>
                      Select category
                    </option>
                    <option value="Games">Games</option>
                    <option value="Comics">Comics</option>
                    <option value="Statues">Statues</option>
                    <option value="Figures">Figures</option>
                    <option value="Outfit And Accessories">
                      Outfit And Accessories
                    </option>
                  </select>
                  {errors.category && (
                    <p className="text-xs italic text-red-500">
                      {errors.category.message}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="price"
                    className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Price
                  </label>
                  <input
                    type="text"
                    name="price"
                    id="price"
                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-600 focus:ring-primary-600 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
                    placeholder="$2999"
                    {...register("price", {
                      required: "Price is required",
                      pattern: {
                        value: /^[0-9]+(\.[0-9]{1,2})?$/,
                        message: "Invalid price format",
                      },
                    })}
                  />

                  {errors.price && (
                    <p className="text-xs italic text-red-500">
                      {errors.price.message}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="stok"
                    className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Stok
                  </label>
                  <input
                    type="number"
                    name="stok"
                    id="stok"
                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-600 focus:ring-primary-600 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
                    placeholder="15"
                    {...register("stock", {
                      required: "Stock is required",
                      min: {
                        value: 0,
                        message: "Stock must be a non-negative number",
                      },
                    })}
                  />

                  {errors.stock && (
                    <p className="text-xs italic text-red-500">
                      {errors.stock.message}
                    </p>
                  )}
                </div>

                <div className="sm:col-span-2">
                  <label
                    htmlFor="description"
                    className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Description
                  </label>
                  <textarea
                    id="description"
                    rows="4"
                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
                    placeholder="Write product description here"
                    {...register("description", {
                      required: "Description is required",
                    })}
                  ></textarea>
                </div>
                {errors.description && (
                  <p className="text-xs italic text-red-500">
                    {errors.description.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="inline-flex items-center rounded-lg bg-primary-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                <svg
                  className="-ml-1 mr-1 h-6 w-6"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                    clipRule="evenodd"
                  />
                </svg>
                Add new product
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
export default Create;
