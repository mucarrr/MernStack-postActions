import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllPosts } from '../redux/actions/PostActions'
import { BiEdit, BiTrash } from 'react-icons/bi'
import { deletePost } from '../redux/actions/PostActions'
import { toast } from 'react-toastify'
import { closeModal, openModal } from '../redux/slices/ModalSlice'

const Home = () => {
  const dispatch = useDispatch()
  const { posts, loading, error } = useSelector((state) => state.post)
  
  useEffect(() => {
    dispatch(getAllPosts())
  }, [])

  const formatDate = (dateString) => {
    if (!dateString) return 'Date not available'
    try {
      const date = new Date(dateString)
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    } catch (error) {
      return 'Date not available'
    }
  }

  const handleEdit = (post) => {
    dispatch(openModal({ 
      mode: 'update', 
      postData: post 
    }))
  }

  const handleDelete = (postId) => {
    dispatch(deletePost(postId))  
    toast.success('Post deleted successfully')
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        {loading && (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500"></div>
          </div>
        )}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-md mb-6">
            Error: {error}
          </div>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4">
          {posts?.map((post) => (
            <div 
              key={post?._id}
              className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden border border-gray-100 w-full h-80 flex flex-col relative group"
            >
              <div className="absolute bottom-4 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10">
                <button
                  onClick={() => handleEdit(post)}
                  className="w-8 h-8 bg-indigo-500 hover:bg-indigo-600 text-white rounded-full flex items-center justify-center transition-colors duration-200 shadow-md"
                >
                  <BiEdit className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(post._id)}
                  className="w-8 h-8 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center transition-colors duration-200 shadow-md"
                >
                  <BiTrash className="w-4 h-4" />
                </button>
              </div>

              <div className="p-4 flex-1 flex flex-col">
                <div className="flex items-center gap-2 mb-5">
                  <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-semibold text-xs">
                      {post?.username?.charAt(0)?.toUpperCase() || '?'}
                    </span>
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="font-semibold text-gray-800 text-sm truncate">{post?.username || 'Anonymous'}</div>
                    <div className="text-xs text-gray-500 truncate">{formatDate(post?.createdAt)}</div>
                  </div>
                </div>
                <h1 className="text-lg font-bold text-gray-800 mb-2 leading-tight line-clamp-2">
                  {post?.title}
                </h1>
                <p className="text-gray-600 text-sm leading-relaxed flex-1 line-clamp-4">
                  {post?.message}
                </p>
              </div>
              <div className="bg-gradient-to-r from-indigo-500 to-purple-500 h-1"></div>
            </div>
          ))}
        </div>
        {posts?.length === 0 && !loading && (
          <div className="text-center py-12">
            <div className="text-gray-400 text-lg">No posts yet</div>
            <div className="text-gray-300 text-sm mt-2">Be the first to share your thoughts!</div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Home