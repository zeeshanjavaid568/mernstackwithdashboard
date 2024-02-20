import { NavLink, Navigate, Outlet } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import { FaServicestack } from "react-icons/fa6";
import { MdContactPhone } from "react-icons/md";
import { useAuth } from "../../store/auth";

const AdminLayout = () => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <h1> Loading ... </h1>;
  }

  if (!user.isAdmin) {
    return <Navigate to={"/"} />;
  }

  return (
    <>
      <div className="admin_layout">
        <header>
          <div className="container">
            <nav>
              <ul>
                <li>
                  <NavLink to={"/admin/users"}>
                    {" "}
                    <FaUser />
                    User{" "}
                  </NavLink>
                </li>
                <li>
                  <NavLink to={"/admin/contacts"}>
                    {" "}
                    <MdContactPhone />
                    Contacts{" "}
                  </NavLink>
                </li>
                <li>
                  <NavLink to={"/admin/services"}>
                    {" "}
                    <FaServicestack />
                    Services{" "}
                  </NavLink>
                </li>
              </ul>
            </nav>
          </div>
        </header>
        <Outlet />
      </div>
    </>
  );
};

export default AdminLayout;
