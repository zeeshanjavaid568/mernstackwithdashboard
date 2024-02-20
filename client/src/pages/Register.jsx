import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../store/auth";
import { toast } from "react-toastify";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";

const Register = () => {
  const [user, setUser] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
  });

  const navigate = useNavigate();
  const { storetokenInLS, API } = useAuth();

  const handleInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setUser({
      ...user,
      [name]: value,
    });
  };
  console.log(user);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      });

      const res_data = await response.json();
      console.log("res_data response", res_data);
      if (response.ok) {
        toast.success("Registration Successful");
        //TODO: stored the token in local storage
        storetokenInLS(res_data.token);
        //! setUser method used for empty useState form data
        setUser({ username: "", email: "", phone: "", password: "" });
        navigate("/");
      } else {
        toast.error(
          res_data.extraDetails ? res_data.extraDetails : res_data.message
        );
      }
    } catch (error) {
      console.log("Register error", error);
    }
  };

  return (
    <>
      <Navbar />
      <main>
        <div className="section-registration">
          <div className="container grid grid-two-cols">
            <div className="resgtistration-image">
              <img
                src="/image/register-and-login-page.png"
                alt=""
                width="500"
                height="500"
              />
            </div>
            <div className="registration-form">
              <h1 className="main-heading mb-3"> Registration Form </h1>
              <br />

              <form onSubmit={handleSubmit}>
                <div>
                  <label htmlFor="username"> UserName </label>
                  <input
                    type="text"
                    name="username"
                    placeholder="username"
                    id="user"
                    autoComplete="off"
                    value={user.username}
                    onChange={handleInput}
                  />
                </div>
                <div>
                  <label htmlFor="email"> Email </label>
                  <input
                    type="email"
                    name="email"
                    placeholder="email"
                    id="email"
                    autoComplete="off"
                    value={user.email}
                    onChange={handleInput}
                  />
                </div>
                <div>
                  <label htmlFor="phone"> Phone </label>
                  <input
                    type="number"
                    name="phone"
                    placeholder="phone"
                    id="phone"
                    autoComplete="off"
                    value={user.phone}
                    onChange={handleInput}
                  />
                </div>
                <div>
                  <label htmlFor="password"> Password </label>
                  <input
                    type="password"
                    name="password"
                    placeholder="password"
                    id="password"
                    autoComplete="off"
                    value={user.password}
                    onChange={handleInput}
                  />
                </div>
                <br />

                <button type="submit" className="btn btn-submit">
                  Register Now
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Register;
