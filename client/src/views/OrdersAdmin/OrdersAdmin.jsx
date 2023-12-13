import { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import OrPagination from "../../components/Pagination/OrPagination";
import AdFilters from "../../components/Filters/AdFilters";

function OrdersAdmin() {
  const [orders, setOrders] = useState(null);
  const [orderFormData, setOrderFormData] = useState([]);
  const ordersPage = useSelector(({ ordersPage }) => ordersPage);
  const pageSize = useSelector(({ pageSizeOrders }) => pageSizeOrders);
  const [update, setUpdate] = useState(false);
  const [options, setOptions] = useState({
    state: "All states",
    createdDate: "",
  });
  const getAllOrders = async () => {
    const endpoint = "/order?";
    try {
      const response = await axios.get(endpoint, {
        params: {
          page: ordersPage,
          pageSize,
          createdDate: options.createdDate,
          state: options.state,
        },
      });
      const data = response.data;
      console.log("orders", data);
      if (!data) {
        throw new Error("There was no data");
      }
      const ordersWithFormData = data.map(
        ({
          id,
          email,
          quantity,
          creationDate,
          price,
          product_name,
          product_id,
          state,
        }) => ({
          id,
          email,
          quantity,
          creationDate,
          price,
          product_name,
          product_id,
          state,
        }),
      );
      setOrderFormData(ordersWithFormData);
      setOrders(data);
    } catch (error) {
      console.error("Error fetching orders:", error.message);
    }
  };
  useEffect(() => {
    getAllOrders();
  }, [ordersPage]);

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
      setUpdate(!update);
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

  const handleClick = () => getAllOrders();

  // const ordersRendered = ordersFiltered.length === 0 ? orders : ordersFiltered;
  console.log("page", ordersPage);
  return (
    <>
      <section className=" p-3 antialiased dark:bg-gray-900 sm:p-5">
        <div className="mx-auto max-w-screen-xl px-4 lg:px-12">
          <div className="relative overflow-hidden bg-white shadow-md dark:bg-gray-800 sm:rounded-lg">
            <AdFilters
              options={options}
              setOptions={setOptions}
              handleClick={handleClick}
            />
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
                  {orderFormData?.map((order, i) => (
                    <tr key={i} className="border-b dark:border-gray-700">
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
            {<OrPagination indexPage={orderFormData} />}
          </div>
        </div>
      </section>

      <div className="mx-auto mt-5 max-w-screen-xl px-4 lg:px-12">
        <button
          type="button"
          onClick={handleSubmit}
          className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
        >
          Update
        </button>
      </div>
    </>
  );
}

export default OrdersAdmin;
