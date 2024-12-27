import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { FaUserCircle } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";

const UserDetails = ({id}) => {
      const [user,setUser]=useState({})

    useEffect(()=>{
        const fetchUser=async()=>{
        const api= await axios.get(`https://mern-2024-api-7tat.onrender.com/api/users/${id}`,{
          headers:{
            "Content-Type":"application/json"
          },
          withCredentials:true
        })
        // console.log(api)
        setUser(api.data.users)
        }
        fetchUser()
        },[])
        
  return (
    <>
     <h3><FaUserCircle></FaUserCircle> {" "} {user.name}</h3> 
     <h3><MdOutlineEmail></MdOutlineEmail>{" "}{user.email}</h3>
    </>
  )
}

export default UserDetails
