import React, { useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Context from "../context/AuthContext";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { IoIosLogIn } from "react-icons/io";
import { FaUserCircle } from "react-icons/fa";
import { CiLogout } from "react-icons/ci";

const Navbar = () => {
  const auth = useContext(Context);
  const navigate = useNavigate();

  const logOut = async () => {
    const api = await axios.get(
      `https://mern-2024-api-7tat.onrender.com/api/users/logOut`,
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );
    toast.success(api.data.message, {
      position: "top-center",
      autoClose: 1500,
      hideProgressBar: false,
      pauseOnHover: true,
      draggable: true,
      theme: "dark",
      transition: Bounce,
    });
    auth.setIsAuthenticated(false);
    setTimeout(() => {
      navigate("/");
    }, 1500);
  };

  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={1500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition={Bounce}
      />
      <div className="navbar">
        <Link to={"/"} className="left">
          <h2>MERN Blog App</h2>
        </Link>
        <div className="right">

        {(!auth.isAuthenticated) &&  <Link to={"/login"} className="items">
            <h3><IoIosLogIn></IoIosLogIn></h3>
          </Link> }

          {(!auth.isAuthenticated) &&  <Link to={"/register"} className="items">
            <h3>Register</h3>
          </Link> }

          {(auth.isAuthenticated) &&  <Link to={"/addblog"} className="items">
            <h3>AddBlog</h3>
          </Link> }
        
          {(auth.isAuthenticated) &&  <Link to={"/profile"} className="items">
            <h3><FaUserCircle></FaUserCircle></h3>
          </Link> }
         
          {(auth.isAuthenticated) &&  <div className="items" onClick={logOut}>
            <h3><CiLogout ></CiLogout></h3>
          </div>
           }
            
        </div>
      </div>
    </>
  );
};

export default Navbar;
