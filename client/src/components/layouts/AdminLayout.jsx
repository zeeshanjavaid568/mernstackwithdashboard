import { NavLink, Outlet } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import { FaServicestack } from "react-icons/fa6";
import { MdContactPhone } from "react-icons/md";

const AdminLayout = () => {
  return (
    <>
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
    </>
  );
};

export default AdminLayout;
