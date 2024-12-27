import React, { useContext, useEffect } from 'react'
import {Routes,Route, useNavigate} from 'react-router-dom'
import Home from './pages/Home'
import AddBlog from './pages/AddBlog'
import Login from './pages/Login'
import Profile from './pages/Profile'
import Register from './pages/Register'
import Navbar from './Components/Navbar'
import Context from './context/context'


const App = () => {

const auth=useContext(Context)
const navigate=useNavigate()

useEffect(()=>{
if(!auth.isAuthenticated){
  navigate("/")
}
},[auth.isAuthenticated])

  return (
    <>
    <Navbar></Navbar>
    <Routes>
      <Route path='/' element={<Home></Home>}></Route>
      <Route path='/addblog' element={<AddBlog></AddBlog>}></Route>
      <Route path='/login' element={<Login></Login>}></Route>
      <Route path='/profile' element={<Profile></Profile>}></Route>
      <Route path='/register' element={<Register></Register>}></Route>
    </Routes>
    </>
  )
}

export default App
