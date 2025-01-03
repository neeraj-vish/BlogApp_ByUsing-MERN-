import React, { useContext, useState } from "react";
import axios from "axios";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Context from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const auth = useContext(Context);
  console.log(auth);

  const formHandler = async (e) => {
    e.preventDefault();

    try {
      const api = await axios.post(
        `https://mern-2024-api-7tat.onrender.com/api/users/register`,
        { name, email, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      // console.log(api);

      toast.success(api.data.message, {
        position: "top-center",
        autoClose: 1500,
        hideProgressBar: false,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
        transition: Bounce,
      });

      setName("");
      setEmail("");
      setPassword("");

      auth.setIsAuthenticated(true);
      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (error) {
      // console.error(error);
      setName("");
      setEmail("");
      setPassword("");

      toast.error(error.response.data.message, {
        position: "top-center",
        autoClose: 1500,
        hideProgressBar: false,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
        transition: Bounce,
      });
      auth.setIsAuthenticated(false);
    }
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
      <div className="container">
        <h1 className="text-center my-5">Register User</h1>
        <form onSubmit={formHandler}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="d-grid gap-2 my-5">
            <button type="submit" className="btn btn-primary">
              Register
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Register;
