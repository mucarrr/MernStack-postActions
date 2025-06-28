import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../constants/api";

export const loginUser = createAsyncThunk(
    'auth/loginUser',
    async (credentials, { rejectWithValue }) => {
        try {
            const response = await api.post(`/auth/login`, credentials);
            
            const data = await response.data;
            
            return data;
        } catch (error) {
            return rejectWithValue(error.response.data.message || 'Network error');
        }
    }
);

export const registerUser = createAsyncThunk(
    'auth/registerUser',
    async (authData, { rejectWithValue }) => {
        try {
            const response = await api.post(`/auth/register`, authData);
            
            const data = await response.data;
            
            return data;
        } catch (error) {
            return rejectWithValue(error.response.data.message || 'Network error');
        }
    }
);
export const logoutUser = createAsyncThunk(
    'auth/logoutUser',
    async (_, { rejectWithValue }) => {
        try {
            const response = await api.post(`/auth/logout`);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data.message || 'Network error');
        }
    }
);