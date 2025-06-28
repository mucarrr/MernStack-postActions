import { createSlice } from "@reduxjs/toolkit"
import { getAllPosts, createPost, deletePost, updatePost } from "../actions/PostActions"

const initialState = {
    posts: [],
    loading: false,
    error: null
}

const postSlice = createSlice({
    name: "post",
    initialState,
    extraReducers: (builder) => {
        builder.addCase(getAllPosts.pending, (state) => {
            state.loading = true
        })
        builder.addCase(getAllPosts.fulfilled, (state, action) => {
            state.posts = action.payload?.posts
            state.loading = false
        })
        builder.addCase(getAllPosts.rejected, (state, action) => {
            state.error = action.payload
            state.loading = false
        })
        builder.addCase(createPost.fulfilled, (state, action) => {
            state.posts.push(action.payload?.post)
        })
        builder.addCase(createPost.rejected, (state, action) => {
            state.error = action.payload
        })
        builder.addCase(deletePost.fulfilled, (state, action) => {
            const deletedId = action.meta.arg
            state.posts = state.posts.filter((post) => post._id !== deletedId)
        })
        builder.addCase(deletePost.rejected, (state, action) => {
            state.error = action.payload
        })
        builder.addCase(updatePost.pending, (state) => {
            state.loading = true
        })
        builder.addCase(updatePost.fulfilled, (state, action) => {
            const updatedPost = action.payload?.post
            if (updatedPost) {
                state.posts = state.posts.map((post) => 
                    post._id === updatedPost._id ? updatedPost : post
                )
            }
            state.loading = false
        })
        builder.addCase(updatePost.rejected, (state, action) => {   
            state.error = action.payload
            state.loading = false
        })
    }
})

export const { setPosts } = postSlice.actions
export default postSlice.reducer