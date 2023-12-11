import { useState, useEffect } from 'react';
import axios from 'axios';
import AdPagination from '../../components/Pagination/AdPagination';

function OrdersAdmin() {
  const [orders, setOrders] = useState(null);
  const [orderFormData, setOrderFormData] = useState([]);

  useEffect(() => {
    const getAllOrders = async () => {
      const endpoint = '/order';
      try {
        const response = await axios.get(endpoint);
        const data = response.data;
        if (!data) {
          throw new Error('There was no data');
        }
        const ordersWithFormData = data.map(order => {
          const existingFormData = orderFormData.find(data => data.email === order.email);
          return existingFormData || {
            email: order.email,
            state: order.state,
            product_id: order.product_id,
            product_name: order.product_name,
            price: order.price,
            quantity: order.quantity,
            id: order.id,
          };
        });
        setOrderFormData(ordersWithFormData);
        setOrders(data);
      } catch (error) {
        console.error('Error fetching orders:', error.message);
      }
    };

    getAllOrders();
  }, []);

  const handleChange = (event, orderId) => {
    const { name, value } = event.target;
    setOrderFormData(prevData => {
      return prevData.map(order => (
        order.id === orderId ? { ...order, [name]: value } : order
      ));
    });
  };

  const updateOrder = async (orderData) => {
    const endpoint = '/order';

    try {
      const response = await axios.put(endpoint, orderData);
      const data = response.data;
      if (!data) {
        throw new Error('There was no data');
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
      alert('data updated correctly');
    } catch (error) {
      alert('Order(s) could not be updated');
    }
  };

  return (
    <div className="bg-slate-100">
      <section className="bg-gray-50 dark:bg-gray-900 p-3 sm:p-5 antialiased">
        <div className="mx-auto max-w-screen-xl px-4 lg:px-12">
          <div className="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="px-4 py-3">ID</th>
                    <th scope="col" className="px-4 py-4">Email</th>
                    <th scope="col" className="px-4 py-3">Product ID</th>
                    <th scope="col" className="px-4 py-3">Product Name</th>
                    <th scope="col" className="px-4 py-3">Price</th>
                    <th scope="col" className="px-4 py-3">Quantity</th>
                    <th scope="col" className="px-4 py-3">State</th>
                  </tr>
                </thead>
                <tbody>
                  {orders?.map((order) => (
                    <tr key={order.id} className="border-b dark:border-gray-700">
                      <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">{order.id}</td>
                      <td className="px-4 py-3">{order.email}</td>
                      <td className="px-4 py-3">{order.product_id}</td>
                      <td className="px-4 py-3">{order.product_name}</td>
                      <td className="px-4 py-3">{order.price}</td>
                      <td className="px-4 py-3">{order.quantity}</td>
                      <td className="px-4 py-3">
                        <select
                          name="state"
                          onChange={(e) => handleChange(e, order.id)}
                          value={orderFormData.find(data => data.id === order.id)?.state}
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

      <div className="mx-auto max-w-screen-xl px-4 lg:px-12 mt-5">
        <button type="button" onClick={handleSubmit} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Submit
        </button>
      </div>
    </div>
  );
}

export default OrdersAdmin;




