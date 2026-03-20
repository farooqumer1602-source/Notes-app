import React, { useState , useEffect } from 'react';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Register from './components/Register';
import {Routes , Route} from "react-router-dom";
import { Navigate } from 'react-router-dom';
import Home from './components/Home';
import axios from 'axios';


const App = () => {
  const [user, setuser] = useState(null);
  const [loading, setloading] = useState(true);
  useEffect(() => {
   const fetchuser = async ()=>{
    try{
      const token = localStorage.getItem('token');
      if(!token) return;
      const {data} = await axios.get('/api/me',{
        headers: { Authorization: `Bearer ${token}` },
      })
      setuser(data);
    }catch(err){
      localStorage.removeItem('token')
    }finally{
      setloading(false)
    }
   }
   fetchuser()
  }, []);
  if (loading) {
  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      <div className="text-xl text-white">Loading...</div>
    </div>
  );
}
  return (
    <div className='min-h-screen bg-gray-500'>
      <Navbar user={user} setuser={setuser}/>
      <Routes>
        <Route path='/login' element={user? <Navigate to={"/"}/>: <Login setuser={setuser}/> }/>
        <Route path='/register' element={user? <Navigate to={"/"}/>: <Register setuser={setuser}/>}/>
        <Route path='/' element={user? <Home/>: <Navigate to={"/login"}/>}/>
      </Routes>
      
    </div>
  );
}

export default App;
