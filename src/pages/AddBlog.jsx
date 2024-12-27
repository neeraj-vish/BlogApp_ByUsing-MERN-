import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Context from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const AddBlog = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imgUrl, setImgUrl] = useState("");

  const navigate = useNavigate();

  const auth = useContext(Context);
  // console.log(auth)

useEffect(()=>{
  const fetchData=async()=>{
    const api= await axios.get(`https://mern-2024-api-7tat.onrender.com/api/blogs/blog/${auth.id}`,{
      headers:{
        "Content-Type":"application/json"
      },
      withCredentials:true
    })
    // console.log(api)
    // setBlog(api)
    const blog = api.data.blogs;
      setTitle(blog.title);
      setDescription(blog.description);
      setImgUrl(blog.imgUrl);

    
    }
    fetchData()
},[])



  const formHandler = async (e) => {
    e.preventDefault();

    if(!auth.id){
      try {
        const api = await axios.post(
          `https://mern-2024-api-7tat.onrender.com/api/blogs/new`,
          { title, description, imgUrl },
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
  
        setTitle("");
        setDescription("");
        setImgUrl("");
  
        auth.setIsAuthenticated(true);
        setTimeout(() => {
          navigate("/profile");
        }, 1500);
      } catch (error) {
        // console.error(error);
        setTitle("");
        setDescription("");
        setImgUrl("");
  
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
    }
    else{
      try {
        const api = await axios.put(
          `https://mern-2024-api-7tat.onrender.com/api/blogs/${auth.id}`,
          { title, description, imgUrl },
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
  
        setTitle("");
        setDescription("");
        setImgUrl("");
  
        auth.setIsAuthenticated(true);
        setTimeout(() => {
          navigate("/profile");
        }, 1500);
       auth.setId(" ")

      } catch (error) {
        // console.error(error);
        setTitle("");
        setDescription("");
        setImgUrl("");
  
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
        {(auth.id)? ( <h1 className="text-center my-5">Edit Blog</h1>):( <h1 className="text-center my-5">Add Blog</h1>)}
        <form onSubmit={formHandler}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Title
            </label>
            <input
              type="text"
              className="form-control"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">
              Description
            </label>
            <input
              type="text"
              className="form-control"
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="imgUrl" className="form-label">
              ImgUrl
            </label>
            <input
              type="text"
              className="form-control"
              id="imgUrl"
              value={imgUrl}
              onChange={(e) => setImgUrl(e.target.value)}
              required
            />
          </div>

          <div className="d-grid gap-2 my-5">
            {(auth.id)? (<button type="submit" className="btn btn-primary">
              Edit Blog
            </button>):(<button type="submit" className="btn btn-primary">
              Add Blog
            </button>)}
            
          </div>
        </form>
      </div>
    </>
  );
};

export default AddBlog;
