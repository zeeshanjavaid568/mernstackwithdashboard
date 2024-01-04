import { useEffect, useState } from "react";
import { useAuth } from "../store/auth";
import { toast } from "react-toastify";

const Admin_Contacts = () => {
  const [contact, setContact] = useState();

  const { authorizationToken } = useAuth();

  //TODO: ALL CONTACTS GET API USED
  const getAllContacts = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/admin/contacts", {
        method: "GET",
        headers: { Authorization: authorizationToken },
      });
      const contactsData = await response.json();
      setContact(contactsData);
    } catch (error) {
      console.log(`Admin getAllContacts Error: ${error}`);
    }
  };

  //TODO: DELETE CONTACT API USED
  const deleteContact = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/admin/contacts/delete/${id}`,
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
        <div className="container">
          <h1> Admin Contact Data </h1>
        </div>
        <div className="container admin-users">
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
                        {/* <Link to={`/admin/users/${usersData._id}/edit`}> */}
                        Edit
                        {/* </Link> */}
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
        </div>
      </section>
    </>
  );
};

export default Admin_Contacts;
