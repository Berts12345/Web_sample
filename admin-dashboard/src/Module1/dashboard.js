// src/components/Dashboard.js
import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db, auth } from '../firebase';
import { signOut } from 'firebase/auth';

const Dashboard = ({ setIsLoggedIn }) => {
  const [users, setUsers] = useState([]);

  // Fetch users from Firestore
  useEffect(() => {
    const fetchUsers = async () => {
      const usersCollection = collection(db, 'users'); // Example collection: 'users'
      const userSnapshot = await getDocs(usersCollection);
      const userList = userSnapshot.docs.map(doc => doc.data());
      setUsers(userList);
    };

    fetchUsers();
  }, []);

  // Handle logout
  const handleLogout = () => {
    signOut(auth).then(() => {
      setIsLoggedIn(false);
    });
  };

  return (
    <div className="dashboard">
      <h2>Admin Dashboard</h2>
      <button onClick={handleLogout}>Logout</button>

      <h3>Registered Users</h3>
      <ul>
        {users.map((user, index) => (
          <li key={index}>{user.email}</li> // Assuming each user document has an 'email' field
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
