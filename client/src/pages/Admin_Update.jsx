import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../store/auth";

const Admin_Update = () => {
  const [data, setData] = useState({
    username: "",
    email: "",
    phone: "",
  });

  const params = useParams();
  const { authorizationToken } = useAuth();

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
      console.log(
        "🚀 ~ file: Admin_Update.jsx:36 ~ getSingleUserData ~ data:",
        data
      );
      setData(data);
    } catch (error) {
      console.log(`Admin delete User Error: ${error}`);
    }
  };

//   const handleInput = (e) => {
//     let name = e.target.value;
//     let value = e.target.value;

//     setData({
//       ...data,
//       [name]: value,
//     });
//   };

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
            <form>
              <div>
                <label htmlFor="username">username</label>
                <input
                  type="text"
                  name="username"
                  id="username"
                  autoComplete="off"
                  value={data.username}
                //   onChange={handleInput}
                  required
                />
              </div>

              <div>
                <label htmlFor="email">email</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  autoComplete="off"
                  value={data.email}
                //   onChange={handleInput}
                  required
                />
              </div>

              <div>
                <label htmlFor="phone"> Mobile Number </label>
                <input
                  type="number"
                  name="phone"
                  id="phone"
                  autoComplete="off"
                  value={data.phone}
                //   onChange={handleInput}
                  required
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
