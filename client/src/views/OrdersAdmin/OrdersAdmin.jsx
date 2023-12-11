import { useState, useEffect } from "react";
import axios from "axios";
import AdPagination from "../../components/Pagination/AdPagination";
import FiltersOrders from "../../components/Form/Date";
import { useSelector } from "react-redux";

function OrdersAdmin() {
  const [orders, setOrders] = useState(null);
  const [orderFormData, setOrderFormData] = useState([]);
  const ordersFiltered = useSelector(({ ordersFiltered }) => ordersFiltered);

  useEffect(() => {
    const getAllOrders = async () => {
      const endpoint = "/order";
      try {
        const response = await axios.get(endpoint);
        const data = response.data;
        if (!data) {
          throw new Error("There was no data");
        }
        const ordersWithFormData = data.map((order) => {
          const existingFormData = orderFormData.find(
            (data) => data.email === order.email,
          );
          return (
            existingFormData || {
              email: order.email,
              state: order.state,
              product_id: order.product_id,
              product_name: order.product_name,
              price: order.price,
              quantity: order.quantity,
              id: order.id,
            }
          );
        });
        setOrderFormData(ordersWithFormData);
        setOrders(data);
      } catch (error) {
        console.error("Error fetching orders:", error.message);
      }
    };

    getAllOrders();
  }, []);

  const handleChange = (event, orderId) => {
    const { name, value } = event.target;
    setOrderFormData((prevData) => {
      return prevData.map((order) =>
        order.id === orderId ? { ...order, [name]: value } : order,
      );
    });
  };

  const updateOrder = async (orderData) => {
    const endpoint = "/order";

    try {
      const response = await axios.put(endpoint, orderData);
      const data = response.data;
      if (!data) {
        throw new Error("There was no data");
      }
      return data;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      await Promise.all(orderFormData.map(updateOrder));
      alert("data updated correctly");
    } catch (error) {
      alert("Order(s) could not be updated");
    }
  };

  const ordersRendered = ordersFiltered.length === 0 ? orders : ordersFiltered;

  return (
    <>
      <section className=" p-3 antialiased dark:bg-gray-900 sm:p-5">
        <div className="mx-auto max-w-screen-xl px-4 lg:px-12">
          <div className="relative overflow-hidden bg-white shadow-md dark:bg-gray-800 sm:rounded-lg">
            <FiltersOrders />
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-gray-500 dark:text-gray-400">
                <thead className="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="px-4 py-3">
                      Date
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
                  </tr>
                </thead>
                <tbody>
                  {ordersRendered?.map((order) => (
                    <tr
                      key={order.id}
                      className="border-b dark:border-gray-700"
                    >
                      <td className="whitespace-nowrap px-4 py-3 font-medium text-gray-900 dark:text-white">
                        {order.creationDate}
                      </td>
                      <td className="px-4 py-3">{order.email}</td>
                      <td className="px-4 py-3">{order.product_id}</td>
                      <td className="px-4 py-3">{order.product_name}</td>
                      <td className="px-4 py-3">{order.price}</td>
                      <td className="px-4 py-3">{order.quantity}</td>
                      <td className="px-4 py-3">
                        <select
                          name="state"
                          onChange={(e) => handleChange(e, order.id)}
                          value={
                            orderFormData.find((data) => data.id === order.id)
                              ?.state
                          }
                        >
                          <option value="Accepted">Accepted</option>
                          <option value="On the way">On the way</option>
                          <option value="Delivered">Delivered</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <AdPagination />
          </div>
        </div>
      </section>

      <div className="mx-auto mt-5 max-w-screen-xl px-4 lg:px-12">
        <button
          type="button"
          onClick={handleSubmit}
          className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
        >
          Submit
        </button>
      </div>
    </>
  );
}

export default OrdersAdmin;
