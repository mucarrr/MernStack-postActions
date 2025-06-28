import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { registerUser, loginUser } from '../redux/actions/AuthActions'
import { toast } from 'react-toastify'
import { useToken } from '../hooks/useToken'

const Auth = ({ signUp = true }) => {
    const [authData, setAuthData] = useState({
        username: '',
        email: '',
        password: ''
    })
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [token, updateToken, clearToken] = useToken()
    // const { error, loading, user, token} = useSelector((state) => state.auth)

    // useEffect(() => {
    //     console.log(user, 'user');
    //     console.log(token, 'token');
    //     console.log(error, 'error');
    //     console.log(loading, 'loading');
    // }, [user, token, error, loading]);

const onChange = (e) => {
    setAuthData({...authData, [e.target.name]: e.target.value});
    console.log({...authData, [e.target.name]: e.target.value});
}

const handleSubmit = () => {
    if(signUp){
        dispatch(registerUser(authData)).unwrap().then((response) => {
            updateToken(response.token);
            toast.success('Registration successful!');
            navigate('/')
        }).catch((error) => {
            toast.error(error.message || 'Registration failed');
        })
    }else{
        dispatch(loginUser(authData)).unwrap().then((response) => {
            updateToken(response.token);
            toast.success('Login successful!');
            navigate('/')
        }).catch((error) => {
            toast.error(error.message || 'Login failed');
        })
    }
}

    return (
        <div className='w-full h-screen bg-indigo-100 flex items-center justify-center fixed top-0 right-0 bottom-0 left-0 z-50'>
            <div className="w-1/3 bg-white p-4 rounded-md min-w-86">
                <h1 className='text-2xl font-bold text-center mb-4 text-indigo-500'>{signUp ? 'Register' : 'Login'}</h1>
                <div className='flex flex-col gap-4 space-y-4'>
                    {signUp && <input value={authData.username} name='username' onChange={onChange} type="text" placeholder='Username' className='custom-input' />}
                    <input value={authData.email} name='email' onChange={onChange} type="text" placeholder='Email' className='custom-input' />
                    <input value={authData.password} name='password' onChange={onChange} type="text" placeholder='Password' className='custom-input' />
                    <div className='flex flex-col gap-2'>
                        <button 
                        onClick={handleSubmit}
                        className='bg-indigo-500 text-white p-2 rounded-md w-full cursor-pointer hover:bg-indigo-600'>{signUp ? 'Register' : 'Login'}</button>
                        <p className='text-center text-sm text-gray-500'>{signUp ? 'Already have an account?' : 'Don\'t have an account?'} <Link to={signUp ? '/login' : '/register'} className='text-indigo-500'>{signUp ? 'Login' : 'Register'}</Link></p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Auth