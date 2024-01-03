import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../store/auth";
import { toast } from "react-toastify";

const Admin_Update = () => {
  const [data, setData] = useState({
    username: "",
    email: "",
    phone: "",
  });

  const params = useParams();
  const { authorizationToken } = useAuth();

  const handleInputs = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setData({
      ...data,
      [name]: value,
    });
  };

  //TODO: UPDATE USER WITH API USED PATCH METHOD
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `http://localhost:5000/api/admin/users/update/${params.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: authorizationToken,
          },
          body: JSON.stringify(data),
        }
      );

      if (response.ok) {
        toast.success("Updated successfully.");
      } else {
        toast.error("Not Updated successfully.");
      }
    } catch (error) {
      console.log(`Admin delete User Error: ${error}`);
    }
  };

  //TODO: SINGLE USER GET DATA FOR UPDATE API USED
  const getSingleUserData = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/admin/users/${params.id}`,
        {
          method: "GET",
          headers: { Authorization: authorizationToken },
        }
      );
      const data = await response.json();
      setData(data);
    } catch (error) {
      console.log(`Admin delete User Error: ${error}`);
    }
  };

  useEffect(() => {
    getSingleUserData();
  }, []);

  return (
    <>
      <section className="section-contact">
        <div className="contact-content container">
          <h1 className="main-heading"> Users Update Data </h1>
        </div>
        {/* contact page main  */}
        <div className="container grid grid-two-cols">
          {/* contact form content actual  */}
          <section className="section-form">
            <form onSubmit={handleSubmit}>
              <div>
                <label htmlFor="username">username</label>
                <input
                  type="text"
                  name="username"
                  id="username"
                  autoComplete="off"
                  onChange={handleInputs}
                  value={data.username}
                />
              </div>

              <div>
                <label htmlFor="email">email</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  autoComplete="off"
                  onChange={handleInputs}
                  value={data.email}
                />
              </div>

              <div>
                <label htmlFor="phone"> Mobile Number </label>
                <input
                  type="number"
                  name="phone"
                  id="phone"
                  autoComplete="off"
                  onChange={handleInputs}
                  value={data.phone}
                />
              </div>

              <div>
                <button type="submit">submit</button>
              </div>
            </form>
          </section>
        </div>
      </section>
    </>
  );
};

export default Admin_Update;
