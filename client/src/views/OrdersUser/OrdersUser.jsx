import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import OrderEvaluation from "../../components/Review/OrderEvaluation";

function OrdersUser() {
  const [orders, setOrders] = useState(null);
  const { user } = useAuth0();

  let email = null;

  if (user) {
    email = user?.email;
  }

  useEffect(() => {
    const getAllOrders = async () => {
      const endpoint = "/order?";
      try {
        const response = await axios.get(endpoint, { params: { email } });
        const data = response.data;
        if (!data) {
          throw new Error("There was no data");
        }

        const userOrders = data.filter((order) => order.email === email);

        setOrders(userOrders);
      } catch (error) {
        console.error("Error fetching orders:", error.message);
      }
    };

    getAllOrders();
  }, [email]);

  return (
    <div className="bg-slate-100">
      <section className="bg-gray-50 p-3 antialiased dark:bg-gray-900 sm:p-5">
        <div className="mx-auto max-w-screen-xl px-4 lg:px-12">
          <div className="relative overflow-hidden bg-white shadow-md dark:bg-gray-800 sm:rounded-lg">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-gray-500 dark:text-gray-400">
                <thead className="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="px-4 py-3">
                      ID
                    </th>
                    <th scope="col" className="px-4 py-4">
                      Email
                    </th>
                    <th scope="col" className="px-4 py-3">
                      Product ID
                    </th>
                    <th scope="col" className="px-4 py-3">
                      Product Name
                    </th>
                    <th scope="col" className="px-4 py-3">
                      Price
                    </th>
                    <th scope="col" className="px-4 py-3">
                      Quantity
                    </th>
                    <th scope="col" className="px-4 py-3">
                      State
                    </th>
                    <th scope="col" className="px-4 py-3">
                      Reseñas
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {orders?.map((order) => (
                    <tr
                      key={order.id}
                      className="border-b dark:border-gray-700"
                    >
                      <td className="whitespace-nowrap px-4 py-3 font-medium text-gray-900 dark:text-white">
                        {order.id}
                      </td>
                      <td className="px-4 py-3">{order.email}</td>
                      <td className="px-4 py-3">{order.product_id}</td>
                      <td className="px-4 py-3">{order.product_name}</td>
                      <td className="px-4 py-3">{order.price}</td>
                      <td className="px-4 py-3">{order.quantity}</td>
                      <td className="px-4 py-3">{order.state}</td>

                      <td className="px-4 py-3">
                        <OrderEvaluation
                          orderId={order.id}
                          orderState={order.state}
                          productId={order.product_id}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default OrdersUser;
