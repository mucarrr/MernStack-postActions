import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Auth from './pages/Auth' 
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useToken } from './hooks/useToken'
import Navbar from './components/Navbar'
import Modal from './components/Modal'
import { useSelector } from 'react-redux'


const App = () => {
  const [token, updateToken, clearToken] = useToken();
  const {isOpen} = useSelector((state) => state.modal)
  return (
    <> 
   <BrowserRouter>
   {token && <Navbar/>}
   {isOpen && <Modal/>}
    <Routes>
      <Route path='/' element={token ? <Home/> : <Auth signUp={false}/>}/>
      <Route path='/register' element={<Auth signUp={true}/>}/>
      <Route path='/login' element={<Auth signUp={false}/>}/>
    </Routes>
   </BrowserRouter>
   <ToastContainer 
     autoClose={500}
     hideProgressBar={false}
     newestOnTop={false}
     closeOnClick
     rtl={false}
     pauseOnFocusLoss
     draggable
     pauseOnHover
   />
   </>
  )
}

export default App