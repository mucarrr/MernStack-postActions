import React from 'react'
import { BiLogOut } from 'react-icons/bi'
import { useToken } from '../hooks/useToken'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useDispatch } from 'react-redux'
import { openModal } from '../redux/slices/ModalSlice'

const Navbar = () => {
  const [, clearToken] = useToken();
  const navigate = useNavigate();
  const dispatch = useDispatch()
  return (
    <div className='h-20 text-white bg-indigo-500 flex justify-between items-center px-10'>
      <div className='text-2xl font-bold cursor-pointer'>SHARE POST</div>
      <div className='flex items-center gap-4'>
        <input type="text" placeholder='Search...' className='max-w-96 h-10 rounded-md p-2 border-2 outline-none' />
        <div 
        onClick={() => {
            dispatch(openModal())
        }}
        className='bg-white text-indigo-500 px-4 py-2 rounded-md cursor-pointer  hover:bg-gray-200 truncate'>Share Post</div>
        <BiLogOut className='w-8 h-8 cursor-pointer' 
        onClick={() => {
            clearToken();
            toast.success('Successfully logged out');
            navigate('/login');
        }}
        />
      </div>
    </div>
  )
}

export default Navbar