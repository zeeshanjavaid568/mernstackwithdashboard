import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Register from "./pages/Register";
import Login from "./pages/login";
import Serivces from "./pages/Serivces";
import Error from "./pages/Error";
import Logout from "./pages/Logout";
import AdminLayout from "./components/layouts/AdminLayout";
import Admin_Users from "./pages/Admin_Users";
import Admin_Contacts from "./pages/Admin_Contacts";
import Admin_Services from "./pages/Admin_Services";
import Admin_Contacts_Update from "./pages/Admin_Contacts_Update";
import Admin_Users_Update from "./pages/Admin_Users_Update";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/services" element={<Serivces />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="*" element={<Error />} />
        {/* //TODO: Admin Panel Nested Routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="users" element={<Admin_Users />} />
          <Route path="users/:id/edit" element={<Admin_Users_Update />} />
          <Route path="contacts" element={<Admin_Contacts />} />
          <Route path="contacts/:id/edit" element={<Admin_Contacts_Update />} />
          <Route path="services" element={<Admin_Services />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
