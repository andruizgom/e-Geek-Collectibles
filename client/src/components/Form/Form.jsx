import { useForm } from "react-hook-form";
import { useDispatch } from 'react-redux';
import { createProduct } from '../../redux/actions/index.js';
import { useUploadImage } from './service/useUploadImage.js';

const Form = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const { imageUrl, loading, error, uploadImage } = useUploadImage();
  const dispatch = useDispatch();

  const onSubmit = handleSubmit(async(product) => {
    try {
      await uploadImage(product?.image);
      const newProduct = { ...product, image:"https://i.ibb.co/YfLX4sj/2-min.jpg" }
      // console.log(newProduct)
      dispatch(createProduct(newProduct));
    } catch (error) {
      console.error(error);
    }
  });

  return (
    <div className="max-w-md mx-auto">
      <form
        action=""
        className="bg-blue-300 p-10 mb-4 mt-5 rounded-md dark:bg-blue-400"
        onSubmit={onSubmit}
      >
        <label
          htmlFor="title"
          className="text-white mb-auto dark:text-black"
        >
          Title:
        </label>
        <input
          type="text"
          name="title"
          className="bg-white p-3 w-full mt-2 mb-2"
          {...register("title", {
            required: 'Title is required',
            maxLength: {
              value: 50,
              message: 'Title must not exceed 50 characters',
            },
          })}
        />
        {errors.title && (
          <p className="text-red-500 text-xs italic">
            {errors.title.message}
          </p>
        )}

          <label htmlFor="description" className="text-white dark:text-black">
          Description:
        </label>
        <textarea
          name="description"
          className="bg-white p-3 w-full mt-2 mb-2 border-none"
          {...register("description", {
            required: 'Description is required',
          })}
        ></textarea>
        {errors.description && (
          <p className="text-red-500 text-xs italic">
            {errors.description.message}
          </p>
        )}

        <label htmlFor="category" className="text-white dark:text-black">
          Category:
        </label>
        <input
          type="text"
          name="category"
          className="bg-white p-3 w-full mt-2 mb-2"
          {...register("category", {
            required: 'Category is required',
          })}
        />
        {errors.category && (
          <p className="text-red-500 text-xs italic">
            {errors.category.message}
          </p>
        )}

        <label htmlFor="manufacturer" className="text-white dark:text-black">
          Manufacturer:
        </label>
        <input
          type="text"
          name="manufacturer"
          className="bg-white p-3 w-full mt-2 mb-2"
          {...register("manufacturer", {
            required: 'Manufacturer is required',
          })}
        />
        {errors.manufacturer && (
          <p className="text-red-500 text-xs italic">
            {errors.manufacturer.message}
          </p>
        )}

        <label htmlFor="author" className="text-white dark:text-black">
          Author:
        </label>
        <input
          type="text"
          name="author"
          className="bg-white p-3 w-full mt-2 mb-2"
          {...register("author", {
            required: 'Author is required',
          })}
        />
        {errors.author && (
          <p className="text-red-500 text-xs italic">
            {errors.author.message}
          </p>
        )}

        <label htmlFor="stock" className="text-white dark:text-black">
          Stock:
        </label>
        <input
          type="number"
          name="stock"
          className="bg-white p-3 w-full mt-2 mb-2"
          {...register("stock", {
            required: 'Stock is required',
            min: {
              value: 0,
              message: 'Stock must be a non-negative number',
            },
          })}
        />
        {errors.stock && (
          <p className="text-red-500 text-xs italic">
            {errors.stock.message}
          </p>
        )}

        <label htmlFor="price" className="text-white dark:text-black">
          Price:
        </label>
        <input
          type="number"
          name="price"
          className="bg-white p-3 w-full mt-2 mb-2"
          {...register("price", {
            required: 'Price is required',
            min: {
              value: 0,
              message: 'Price must be a non-negative number',
            },
          })}
        />
        {errors.price && (
          <p className="text-red-500 text-xs italic">
            {errors.price.message}
          </p>
        )}

        <label htmlFor="image" className="text-white dark:text-black">
          Image:
        </label>
        <input
          type="file"
          name="image"
          className="bg-white p-3 w-full mt-2 mb-2"
          // {...register("image", {
          //   required: 'Image is required',
          // })}
          {...register("image")}
        />
        {/* {errors.image && (
          <p className="text-red-500 text-xs italic">
            {errors.image.message}
          </p>
        )} */}

        <label htmlFor="available" className="text-white dark:text-black">
          Available:
        </label>
        <div>
          <input
            type="radio"
            id="true"
            value={true}
            name="available"
            {...register("available", {
              required: 'Available status is required',
            })}
          />
          <label htmlFor="true" className="text-white dark:text-black">
            Yes
          </label>
        </div>
        <div>
          <input
            type="radio"
            id="false"
            value={false}
            name="available"
            {...register("available", {
              required: 'Available status is required',
            })}
          />
          <label htmlFor="false" className="text-white dark:text-black">
            No
          </label>
        </div>
        {errors.available && (
          <p className="text-red-500 text-xs italic">
            {errors.available.message}
          </p>
        )}

        <button
          type="submit"
          className="bg-green-500 px-2 py-1 rounded-md mt-4 text-white hover:bg-green-800 dark:bg-neutral-900"
        >
          Create
        </button>
      </form>
    </div>
  );
};

export default Form;
