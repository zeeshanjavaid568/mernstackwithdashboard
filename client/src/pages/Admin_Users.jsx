import { useEffect, useState } from "react";
import { useAuth } from "../store/auth";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const Admin_Users = () => {
  const [users, setUsers] = useState();
  const [loading, setLoading] = useState(true);
  const { authorizationToken, API } = useAuth();

  //TODO: ALL USERS GET API USED
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

  //TODO: DELETE USER API USED
  const deleteUser = async (id) => {
    try {
      const response = await fetch(
        `${API}/api/admin/users/delete/${id}`,
        {
          method: "DELETE",
          headers: { Authorization: authorizationToken },
        }
      );
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

  return (
    <>
      <div className="admin-users">
        <div className="container">
          <h1>Admin Users Data</h1>
        </div>
        {loading ? (
          //TODO: Show loader while fetching Data
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
              {users?.map((userData, index) => (
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
