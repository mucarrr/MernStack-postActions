import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { closeModal } from '../redux/slices/ModalSlice'
import { BiX } from 'react-icons/bi'
import { createPost, updatePost } from '../redux/actions/PostActions'
import { toast } from 'react-toastify'

const Modal = () => {
    const dispatch = useDispatch()
    const { isOpen, mode, postData } = useSelector((state) => state.modal)
    
    const [formData, setFormData] = useState({
        username: '',
        title: '',
        message: ''
    })

    // Initialize form data when modal opens
    useEffect(() => {
        if (isOpen) {
            if (mode === 'update' && postData) {
                setFormData({
                    username: postData.username || '',
                    title: postData.title || '',
                    message: postData.message || ''
                })
            } else {
                setFormData({
                    username: '',
                    title: '',
                    message: ''
                })
            }
        }
    }, [isOpen, mode, postData])

    const onChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = () => {
        if (mode === 'update' && postData) {
            dispatch(updatePost({ id: postData._id, postData: formData }))
            toast.success("Post updated successfully")
        } else {
            dispatch(createPost(formData))
            toast.success("Post created successfully")
        }
        dispatch(closeModal())
    }

    if (!isOpen) return null

    return (
        <div className='w-full h-screen bg-black/40 fixed top-0 left-0 right-0 bottom-0 z-50 flex items-center justify-center'>
            <div className='bg-white w-1/3 p-8 rounded-md min-w-96'>
                <div className='flex justify-between'>
                    <h1 className='text-2xl text-center mb-4'>
                        {mode === 'update' ? 'Update Post' : 'Share Post'}
                    </h1>
                    <BiX className='w-8 h-8 cursor-pointer' onClick={() => {
                        dispatch(closeModal())
                    }} />
                </div>
                <div className='flex flex-col gap-2'>
                    <input 
                        type="text" 
                        placeholder='Username' 
                        className='custom-input' 
                        name='username' 
                        value={formData.username} 
                        onChange={onChange} 
                    />
                    <input 
                        type="text" 
                        placeholder='Title' 
                        className='custom-input' 
                        name='title' 
                        value={formData.title} 
                        onChange={onChange} 
                    />
                    <textarea 
                        placeholder='Message' 
                        className='custom-input h-50' 
                        name='message' 
                        value={formData.message} 
                        onChange={onChange} 
                    />
                    <button 
                        className='bg-indigo-500 text-white p-2 rounded-md w-full cursor-pointer hover:bg-indigo-600' 
                        onClick={handleSubmit}
                    >
                        {mode === 'update' ? 'Update' : 'Share'}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Modal