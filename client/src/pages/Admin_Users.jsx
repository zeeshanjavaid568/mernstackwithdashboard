import { useEffect, useState } from "react";
import { useAuth } from "../store/auth";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const Admin_Users = () => {
  const [users, setUsers] = useState();
  // console.log("🚀 ~ file: Admin_Users.jsx:6 ~ users:", users);
  const { authorizationToken } = useAuth();

  //TODO: ALL USERS GET API USED
  const getAllUsersData = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/admin/users", {
        method: "GET",
        headers: { Authorization: authorizationToken },
      });
      const data = await response.json();
      // console.log(
      //   "🚀 ~ file: Admin_Users.jsx:17 ~ getAllUsersData ~ data:",
      //   data
      // );
      setUsers(data);
    } catch (error) {
      console.log(`Admin Users Error: ${error}`);
    }
  };

  //TODO: DELETE USER API USED
  const deleteUser = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/admin/users/delete/${id}`,
        {
          method: "DELETE",
          headers: { Authorization: authorizationToken },
        }
      );
      const userDeleteData = await response.json();
      console.log(
        "🚀 ~ file: Admin_Users.jsx:37 ~ deleteUser ~ userDeleteData:",
        userDeleteData
      );
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
      <section>
        <div className="container">
          <h1> Admin Users Data </h1>
        </div>
        <div className="container admin-users">
          <table>
            <tr>
              <th> Name </th>
              <th> Email </th>
              <th> Phone </th>
              <th> Update </th>
              <th> Delete </th>
            </tr>
            <tbody>
              {users?.map((usersData, index) => {
                return (
                  <tr key={index}>
                    <td> {usersData.username} </td>
                    <td> {usersData.email} </td>
                    <td> {usersData.phone} </td>
                    <td>
                      <button>
                      <Link to={`/admin/users/${usersData._id}/edit`}>
                        Edit
                      </Link>
                      </button>
                    </td>
                    <td>
                      <button onClick={() => deleteUser(usersData._id)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
};

export default Admin_Users;
