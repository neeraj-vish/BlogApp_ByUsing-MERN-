import React, { useContext, useEffect } from 'react'
import Context from '../context/AuthContext'
import axios from 'axios'
import MyBlogs from '../Components/MyBlogs'
import { FaUserCircle } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";


const Profile = () => {
const auth=useContext(Context)
useEffect(()=>{
const fetchData=async()=>{
const api= await axios.get(`https://mern-2024-api-7tat.onrender.com/api/users/myprofile`,{
  headers:{
    "Content-Type":"application/json"
  },
  withCredentials:true
})
// console.log(api.data.user)

auth.setUser(api.data.user)
auth.setIsAuthenticated(true)


}
fetchData()
},[])

  return (
  <div className='text-center my-3'>
  <h1><FaUserCircle></FaUserCircle>{" "}{auth.user.name}</h1>
  <h1>< MdOutlineEmail ></MdOutlineEmail>{" "}{auth.user.email}</h1>
  <MyBlogs></MyBlogs>
  </div>
  )
}

export default Profile
