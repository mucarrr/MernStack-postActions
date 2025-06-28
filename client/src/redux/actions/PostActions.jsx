import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../constants/api";

export const getAllPosts = createAsyncThunk(
    "post/getAllPosts",
    async (_, { rejectWithValue }) => {
        try {
            const response = await api.get("/post/getPosts");
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data.message || "Network error");
        }
    }
);

export const createPost = createAsyncThunk(
    "post/createPost",
    async (postData, { rejectWithValue }) => {
        try {
            const response = await api.post("/post/createPost", postData);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data.message || "Network error");
        }
    }
);

export const updatePost = createAsyncThunk(
    "post/updatePost",
    async ({id,postData}, { rejectWithValue }) => {
        try {
            const response = await api.patch(`/post/updatePost/${id}`, postData);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data.message || "Network error");
        }
    }
);
export const deletePost = createAsyncThunk(
    "post/deletePost",
    async (id, { rejectWithValue }) => {
        try {
            const response = await api.delete(`/post/deletePost/${id}`);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data.message || "Network error");
        }
    }
);