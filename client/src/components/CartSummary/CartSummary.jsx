import { Link } from "react-router-dom";
import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
export default function CartSummary({
  subtotal,
  total,
  mostrarCheckout,
  handleBuy,
}) {
  const { user, isAuthenticated } = useAuth0();
  return (
    <div className="mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3">
      <div className="mb-2 flex justify-between">
        <p className="text-gray-700">Subtotal</p>
        <p className="text-gray-700">${subtotal}</p>
      </div>
      <div className="flex justify-between">
        <p className="text-gray-700">Shipping</p>
        <p className="text-gray-700">Free</p>
      </div>
      <hr className="my-4" />
      <div className="flex justify-between">
        <p className="text-lg font-bold">Total</p>
        <div className="">
          <p className="mb-1 text-lg font-bold">${total}</p>
          <p className="text-sm text-gray-700">including TAX</p>
        </div>
      </div>

      {isAuthenticated && mostrarCheckout ? (
        total !== 0 ? (
          <button
            onClick={handleBuy}
            className="mt-6 w-full rounded-md bg-green-500 py-1.5 font-medium text-blue-50 hover:bg-green-600"
          >
            Check out
          </button>
        ) : (
          <button
            className="mt-6 w-full cursor-not-allowed rounded-md bg-gray-300 py-1.5 font-medium text-gray-500"
            disabled
          >
            Check out
          </button>
        )
      ) : (
        <p className="pt-6 text-center text-xs text-red-600">
          Login before paying
        </p>
      )}
    </div>
  );
}
