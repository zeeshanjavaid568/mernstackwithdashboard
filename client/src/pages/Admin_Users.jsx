import { useEffect, useState } from "react";
import { useAuth } from "../store/auth";

const Admin_Users = () => {
  const [users, setUsers] = useState();
  // console.log("🚀 ~ file: Admin_Users.jsx:6 ~ users:", users);
  const { authorizationToken } = useAuth();

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
                    <td> Edite </td>
                    <td> Delete </td>
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
