import { useEffect, useState } from "react";
import { useAuth } from "../store/auth";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const Admin_Services = () => {
  const [users, setUsers] = useState();
  const [loading, setLoading] = useState(true);
  const { authorizationToken } = useAuth();

  //TODO: ALL Services GET API USED
  const getAllServicesData = async () => {
    try {
      setLoading(true);
      const response = await fetch("http://localhost:5000/api/admin/services", {
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

  //TODO: DELETE Service API USED
  const deleteService = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/admin/services/delete/${id}`,
        {
          method: "DELETE",
          headers: { Authorization: authorizationToken },
        }
      );
      const serviceDeleteData = await response.json();
      toast.success(serviceDeleteData.message);
      if (response.ok) {
        getAllServicesData();
      }
    } catch (error) {
      console.log(`Admin delete Services Error: ${error}`);
    }
  };

  useEffect(() => {
    getAllServicesData();
  }, []);

  return (
    <>
      <section>
        <div className="container">
          <h1> Admin Services Data </h1>
        </div>
        <div className="container admin-users">
          {loading ? (
            //TODO: Show loader while fetching Data
            <div>
              {" "}
              <h1> Loading... </h1>
            </div>
          ) : (
            <table>
              <tr>
                <th> Service </th>
                <th> Description </th>
                <th> Price </th>
                <th> Provider </th>
                <th> Update </th>
                <th> Delete </th>
              </tr>
              <tbody>
                {users?.map((servicesData, index) => {
                  return (
                    <tr key={index}>
                      <td> {servicesData.service} </td>
                      <td> {servicesData.description} </td>
                      <td> {servicesData.price} </td>
                      <td> {servicesData.provider} </td>
                      <td>
                        <button>
                          {/* <Link to={`/admin/services/${servicesData._id}/edit`}> */}
                            Edit
                          {/* </Link> */}
                        </button>
                      </td>
                      <td>
                        <button onClick={() => deleteService(servicesData._id)}>
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
          ;
        </div>
      </section>
    </>
  );
};

export default Admin_Services;
