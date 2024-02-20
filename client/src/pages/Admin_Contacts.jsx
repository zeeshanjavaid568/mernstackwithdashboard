import { useEffect, useState } from "react";
import { useAuth } from "../store/auth";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const Admin_Contacts = () => {
  const [contact, setContact] = useState();
  const [loading, setLoading] = useState(true);
  const { authorizationToken, API } = useAuth();

  //TODO: ALL CONTACTS GET API USED
  const getAllContacts = async () => {
    try {
      setLoading(true); //TODO: Set loading to true when starting to fetch
      const response = await fetch(`${API}/api/admin/contacts`, {
        method: "GET",
        headers: { Authorization: authorizationToken },
      });
      const contactsData = await response.json();
      setContact(contactsData);
    } catch (error) {
      console.log(`Admin getAllContacts Error: ${error}`);
    } finally {
      setLoading(false);
    }
  };

  //TODO: DELETE CONTACT API USED
  const deleteContact = async (id) => {
    try {
      const response = await fetch(
        `${API}/api/admin/contacts/delete/${id}`,
        {
          method: "DELETE",
          headers: { Authorization: authorizationToken },
        }
      );
      const contactDeleteData = await response.json();
      toast.success(contactDeleteData.message);
      if (response.ok) {
        getAllContacts();
      }
    } catch (error) {
      console.log(`Admin delete User Error: ${error}`);
    }
  };

  useEffect(() => {
    getAllContacts();
  }, []);

  return (
    <>
      <section>

        <div className="container admin-users">
          <div className="container">
            <h1> Admin Contact Data </h1>
          </div>
          {loading ? (
            //TODO: Show loader while fetching Data
            <div>
              {" "}
              <h1> Loading... </h1>
            </div>
          ) : (
            <table>
              <tr>
                <th> Name </th>
                <th> Email </th>
                <th> Message </th>
                <th> Update </th>
                <th> Delete </th>
              </tr>
              <tbody>
                {contact?.map((contactData, index) => {
                  return (
                    <tr key={index}>
                      <td> {contactData.username} </td>
                      <td> {contactData.email} </td>
                      <td> {contactData.message} </td>
                      <td>
                        <button>
                          <Link to={`/admin/contacts/${contactData._id}/edit`}>
                            Edit
                          </Link>
                        </button>
                      </td>
                      <td>
                        <button onClick={() => deleteContact(contactData._id)}>
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </section>
    </>
  );
};

export default Admin_Contacts;
