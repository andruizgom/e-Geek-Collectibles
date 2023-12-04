import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './UserForm.styles.css'; 

function UserForm() {
    const navigate = useNavigate();

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
            navigate('/admin');
        } catch (error) {
            alert('User(s) could not be updated');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <table>
                <thead>
                    <tr>
                        <th>Email</th>
                        <th>Banned user</th>
                        <th>Admin role</th>
                    </tr>
                </thead>
                <tbody>
                    {users?.map((user) => (
                        <tr key={user.id}>
                            <td>{user.email}</td>
                            <td>
                                <select
                                    name="isBanned"
                                    onChange={(e) => handleChange(e, user.email)}
                                    value={String(userFormData.find(data => data.email === user.email)?.isBanned)}
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
                                >
                                    <option value="true">True</option>
                                    <option value="false">False</option>
                                </select>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <button type="submit">Submit</button>
        </form>
    );
}

export default UserForm;

