import React, { useState } from 'react';
import axios from 'axios';

const UserForm = ({ onSubmit }) => {
  const [username, setUsername] = useState('');
  const [createdUser, setCreatedUser] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/api/users', { username });
      console.log('User created:', response.data);
      setCreatedUser(response.data); // Set created user data in state
      onSubmit(response.data.id);
    } catch (error) {
      console.error('Error creating user:', error);
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">User Form</h2>
      {createdUser && ( // Conditionally render created user information
        <div className="mb-4">
          <p><strong>Created User:</strong></p>
          <ul>
            <li>ID: {createdUser.id}</li>
            <li>Username: {createdUser.username}</li>
            {/* Add more user properties if available in response.data */}
          </ul>
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Enter username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md"
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">Create User</button>
      </form>
    </div>
  );
};

export default UserForm;