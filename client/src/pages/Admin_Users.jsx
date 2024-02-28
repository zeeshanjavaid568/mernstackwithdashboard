import React, { useEffect, useState } from "react";
import { useAuth } from "../store/auth";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const Admin_Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const { authorizationToken, API } = useAuth();

  // Function to fetch all users data
  const getAllUsersData = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API}/api/admin/users`, {
        method: "GET",
        headers: { Authorization: authorizationToken },
      });
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.log(`Admin Users Error: ${error}`);
    } finally {
      setLoading(false);
    }
  };

  // Function to delete a user
  const deleteUser = async (id) => {
    try {
      const response = await fetch(`${API}/api/admin/users/delete/${id}`, {
        method: "DELETE",
        headers: { Authorization: authorizationToken },
      });
      const userDeleteData = await response.json();
      toast.success(userDeleteData.message);
      if (response.ok) {
        getAllUsersData();
      }
    } catch (error) {
      console.log(`Admin delete User Error: ${error}`);
    }
  };

  useEffect(() => {
    getAllUsersData();
  }, []);

  // Function to handle search input change
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // Filter users based on search term
  const filteredUsers = users.filter((user) => {
    return (
      user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.phone.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <>
      <div className="admin-users">
        <div className="container">
          <h1>Admin Users Data</h1>
        </div>
        <div style={{ display: 'flex', justifyContent: 'end', width: '86%', margin: '20px 0' }}>
          <input
            type="text"
            placeholder="Search users..."
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>
        {loading ? (
          // Show loader while fetching Data
          <div>
            <h1>Loading...</h1>
          </div>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Update</th>
                <th>Delete</th>
                <th>Admin</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((userData, index) => (
                <tr key={index}>
                  <td>{userData.username}</td>
                  <td>{userData.email}</td>
                  <td>{userData.phone}</td>
                  <td>
                    <button>
                      <Link to={`/admin/users/${userData._id}/edit`}>Edit</Link>
                    </button>
                  </td>
                  <td>
                    <button onClick={() => deleteUser(userData._id)}>Delete</button>
                  </td>
                  <td style={{ color: userData.isAdmin ? 'green' : 'red' }}>
                    {userData.isAdmin ? 'Yes' : 'No'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
};

export default Admin_Users;
