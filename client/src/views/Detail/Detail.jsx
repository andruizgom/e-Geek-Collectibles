import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getProductById, resetProductDetail, getProductReviews, createReview } from "../../redux/actions";
import CartContext from "../../context/CartContext";
import FavButton from "../../components/FavButton/FavButton";
import { StarIcon } from "@heroicons/react/20/solid";
import PaymentForm from "../../components/Stripe/PaymentForm";
import { loadStripe } from "@stripe/stripe-js";
import ShowReview from "../../components/Review/ShowReview";
import Reviews from "../../components/Review/Review";
import ReviewForm from "../../components/Review/ReviewForm";

const stripePromise = loadStripe("pk_test_51OHSFxEdGwHq7UR2MSY16IkLw9ATiMPpMbDz4o3pQKINyv0gNmxMnW8YB1me0V7pfzRGrkEgjPfeOvrstgT6jWId00FqILQQ0n");

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Detail() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const { agregarAlCarrito } = useContext(CartContext);

  const useProducts = () => {
    const productsDetail = useSelector((state) => state.productsDetail);
    useEffect(() => {
      if (id) {
        dispatch(getProductById(id))
          .then()
          .catch((err) => {
            throw new Error("Error: ", err);
          });
      }
      return () => {
        dispatch(resetProductDetail());
      };
    }, [dispatch, id]);
    return productsDetail;
  };

  const productDetail = useProducts();

  const handleAddToCart = (e) => {
    e.preventDefault();
    agregarAlCarrito(productDetail, quantity);
  };

  const handleBuyNow = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3001/crear-pago', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ cartItems: [{ productId: productDetail.id, quantity }] }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Error en la solicitud:', errorData.error);
      } else {
        const session = await response.json();
        console.log('Sesión creada:', session);
        const stripe = await stripePromise;
        await stripe.redirectToCheckout({
          sessionId: session.id
        });
      }
      
    } catch (error) {
      console.error('Error en la solicitud:', error);
    }
  };

  const handleIncrement = () => {
    quantity < productDetail.stock && setQuantity(quantity + 1);
  };

  const handleDecrement = () => {
    quantity > 1 && setQuantity(quantity - 1);
  };

  return (
    <div className="bg-white">
      <div className="pt-6">
        <nav aria-label="Breadcrumb">
          <ol
            role="list"
            className="mx-auto flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8"
          >
            <li>
              <div className="flex items-center">
                <Link
                  to="/home"
                  className="mr-2 text-sm font-medium text-gray-900"
                >
                  Products
                </Link>
                <svg
                  width={16}
                  height={20}
                  viewBox="0 0 16 20"
                  fill="currentColor"
                  aria-hidden="true"
                  className="h-5 w-4 text-gray-400"
                >
                  <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                </svg>
              </div>
            </li>
            <li className="text-sm">
              <p className="font-medium text-gray-400 hover:text-gray-600">
                {productDetail.title}
              </p>
            </li>
          </ol>
        </nav>
        <div className="mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-x-8 lg:px-8">
          <div className="aspect-h-4 aspect-w-3 lg:aspect-h-4 lg:aspect-w-3 sm:overflow-hidden sm:rounded-lg">
            <img
              src={productDetail.image}
              alt={productDetail.title}
              className="h-full w-full object-cover object-center"
            />
          </div>
        </div>
        <div className="mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16">
          <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
            <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
              {productDetail.title}
            </h1>
          </div>
          <div className="mt-4 lg:row-span-3 lg:mt-0">
            <h2 className="sr-only">Product information</h2>
            <p className="text-3xl tracking-tight text-gray-900">
              ${productDetail.price}
            </p>
            <FavButton />
            <div>
          <Reviews productId={productDetail.id} />
      </div>
              <div className="mt-8 flex items-center border-gray-100">
                <span
                  onClick={handleDecrement}
                  className="cursor-pointer rounded-l bg-gray-100 px-3.5 py-1 duration-100 hover:bg-amber-500 hover:text-gray-200"
                >
                  -
                </span>
                <span className="text-m h-8 w-8 border bg-white py-1 text-center outline-none">
                  {quantity}
                </span>
                <span
                  onClick={handleIncrement}
                  className="cursor-pointer rounded-r bg-gray-100 px-3 py-1 duration-100 hover:bg-amber-500 hover:text-gray-200"
                >
                  +
                </span>
                <span className="ml-4 text-sm font-medium text-gray-500">
                  Inventory: {productDetail.stock > 0 ? productDetail.stock : 'SIN STOCK'}
                </span>
              </div>
            </div>
            <form className="mt-10 flex">
              <div className="mr-4 w-1/2">
                <button
                  type="submit"
                  className="flex w-full items-center justify-center rounded-md border border-transparent bg-amber-500 px-8 py-3 text-base font-medium text-white hover:bg-amber-600 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-2"
                  onClick={handleAddToCart}
                >
                  Add to bag
                </button>
              </div>
              <div className="w-1/2">
                <button
                  className="flex w-full items-center justify-center rounded-md border border-transparent bg-green-500 px-8 py-3 text-base font-medium text-white hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2"
                  onClick={handleBuyNow}
                >
                  Buy Now
                </button>
              </div>
            </form>
          
          <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6">
            <div>
              <h3 className="sr-only">Description</h3>
              <div className="space-y-6">
                <p className="text-base text-gray-900">
                  {productDetail.description}
                </p>
              </div>
            </div>
            <div className="mt-10">
              <h3 className="text-sm font-medium text-gray-900">Details</h3>
              <div className="mt-4">
                <ul role="list" className="list-disc space-y-2 pl-4 text-sm">
                  <li key={productDetail.category} className="text-gray-400">
                    <span className="text-gray-600">
                      Category: {productDetail.category}
                    </span>
                  </li>
                  <li key={productDetail.author} className="text-gray-400">
                    <span className="text-gray-600">
                      Author: {productDetail.author}
                    </span>
                  </li>
                  <li
                    key={productDetail.manufacturer}
                    className="text-gray-400"
                  >
                    <span className="text-gray-600">
                      Manufacturer: {productDetail.manufacturer}
                    </span>
                    <div className="mt-10">
  <ShowReview productId={productDetail.id} />
</div>

                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}