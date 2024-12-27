import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import UserDetails from '../Components/UserDetails'
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Context from '../context/AuthContext';
import { useNavigate } from "react-router-dom";

const MyBlogs = () => {
  const [blog,setBlog]=useState([])
  const auth=useContext(Context)
  const navigate=useNavigate()

useEffect(()=>{
const fetchData=async()=>{
const api= await axios.get(`https://mern-2024-api-7tat.onrender.com/api/blogs/myblogs`,{
  headers:{
    "Content-Type":"application/json"
  },
  withCredentials:true
})
// console.log(api.data.blogs)
setBlog(api.data.blogs)
}
fetchData()
},[])

const deleteBlog=async(id)=>{
    const api= await axios.delete(`https://mern-2024-api-7tat.onrender.com/api/blogs/${id}`,{
        headers:{
          "Content-Type":"application/json"
        },
        withCredentials:true
      })
    //   console.log(api)
    //   setBlog(api.data.blogs)
     toast.success(api.data.message, {
             position: "top-center",
             autoClose: 1500,
             hideProgressBar: false,
             pauseOnHover: true,
             draggable: true,
             theme: "dark",
             transition: Bounce,
           });
      }
   
const editBlog=async(id)=>{
auth.setId(id)
 navigate("/addblog");
     
}


  return (
    <>
    <div className="container text-center my-5 " style={{width:"56%", marginRight:"300px"}}>

   {blog.map((data)=>{
    return(
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

          <div className="card mb-3 bg-secondary text-light my-4" style={{maxWidth:"760px"}}>
     <div className="row g-0">
    <div className="col-md-4" style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
      <img src={data.imgUrl} className="img-fluid rounded-start" alt="..."/>
    </div>
    <div className="col-md-8">
      <div className="card-body">
        <h2 className="card-title">{data.title}</h2>
        <p className="card-text">{data.description}</p>
        <p className="card-text"><small>{data.CreatedAt}</small></p>
        <UserDetails id={data.user}></UserDetails>
        <button className='btn btn-warning mx-2' onClick={()=>editBlog(data._id)}>Edit</button>
        <button className='btn btn-danger mx-5' onClick={()=>deleteBlog(data._id)}>Delete</button>
      </div>
    </div>
  </div>
</div>
      
      </>
    )
   })}


    </div>
    </>
  )
}

export default MyBlogs
