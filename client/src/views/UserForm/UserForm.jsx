import { useState, useEffect } from 'react';
import axios from 'axios';

function UserForm() {
  const [users, setUsers] = useState(null);
  const [userFormData, setUserFormData] = useState([]);

  useEffect(() => {
    const getAllUsers = async () => {
      const endpoint = '/users';
      try {
        const response = await axios.get(endpoint);
        const data = response.data;
        if (!data) {
          throw new Error('There was no data');
        }
        const usersWithFormData = data.map(user => {
          const existingFormData = userFormData.find(data => data.email === user.email);
          return existingFormData || {
            email: user.email,
            isAdmin: user.isAdmin,
            isBanned: user.isBanned,
          };
        });
        setUserFormData(usersWithFormData);
        setUsers(data);
      } catch (error) {
        console.error('Error fetching users:', error.message);
      }
    };

    getAllUsers();
  }, []);

  const handleChange = (event, userEmail) => {
    const { name, value } = event.target;
    setUserFormData(prevData => prevData.map(user => (
      user.email === userEmail ? { ...user, [name]: name === 'isAdmin' || name === 'isBanned' ? JSON.parse(value) : value } : user
    )));
  };

  const updateUser = async (userData) => {
    const endpoint = '/users';

    try {
      const response = await axios.put(endpoint, userData);
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
      await Promise.all(userFormData.map(updateUser));
      alert('data updated correctly');
    } catch (error) {
      alert('User(s) could not be updated');
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
                    <th scope="col" className="px-4 py-3">Email</th>
                    <th scope="col" className="px-4 py-4">Banned user</th>
                    <th scope="col" className="px-4 py-3">Admin role</th>
                  </tr>
                </thead>
                <tbody>
                  {users?.map((user) => (
                    <tr key={user.id}>
                      <td className="px-4 py-3">{user.email}</td>
                      <td>
                        <select
                          name="isBanned"
                          onChange={(e) => handleChange(e, user.email)}
                          value={String(userFormData.find(data => data.email === user.email)?.isBanned)}
                          className="border p-2"
                        >
                          <option value="true">True</option>
                          <option value="false">False</option>
                        </select>
                      </td>
                      <td>
                        <select
                          name="isAdmin"
                          onChange={(e) => handleChange(e, user.email)}
                          value={String(userFormData.find(data => data.email === user.email)?.isAdmin)}
                          className="border p-2"
                        >
                          <option value="true">True</option>
                          <option value="false">False</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-screen-xl px-4 lg:px-12 mt-5">
        <button type="submit" onClick={handleSubmit} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Submit
        </button>
      </div>
    </div>
  );
}

export default UserForm;


