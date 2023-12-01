import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function UserForm() {
    const navigate = useNavigate();

    const [users, setUsers] = useState(null);
    const [userData, setUserData] = useState({
        email: '',
        isAdmin: null,
        isBanned: null,
    });

    useEffect(() => {
        const getAllUsers = async () => {
            const endpoint = '/users';
            try {
                const response = await axios.get(endpoint);
                const data = response.data;
                if (!data) {
                    throw new Error('There was no data');
                }
                setUsers(data);
            } catch (error) {
                console.error('Error fetching users:', error.message);
            }
        };

        getAllUsers();
    }, []);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setUserData((prevUserData) => ({
            ...prevUserData,
            [name]: name === 'isAdmin' || name === 'isBanned' ? JSON.parse(value) : value,
        }));
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

    const handleSubmit = async (evento) => {
        try {
            evento.preventDefault();
            await updateUser(userData);
            navigate('/admin');
        } catch (error) {
            alert('User could not be updated');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="email">Select user</label>
            <select name="email" onChange={handleChange} value={userData.email}>
                <option>Select...</option>
                {users?.map((user) => (
                    <option key={user.id} value={user.email}>
                        {user.email}
                    </option>
                ))}
            </select>

            <label htmlFor="isBanned">Banned user</label>
            <select name="isBanned" onChange={handleChange} value={String(userData.isBanned)}>
                <option>Select...</option>
                <option value="true">True</option>
                <option value="false">False</option>
            </select>

            <label htmlFor="isAdmin">Admin role</label>
            <select name="isAdmin" onChange={handleChange} value={String(userData.isAdmin)}>
                <option>Select...</option>
                <option value="true">True</option>
                <option value="false">False</option>
            </select>

            <button type="submit">Submit</button>
        </form>
    );
}

export default UserForm;

