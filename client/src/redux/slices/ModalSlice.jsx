import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    isOpen: false,
    mode: 'create', // 'create' or 'update'
    postData: null // null for create, post object for update
}

const modalSlice = createSlice({
    name: 'modal',
    initialState,
    reducers: {
        openModal: (state, action) => {
            state.isOpen = true
            state.mode = action.payload?.mode || 'create'
            state.postData = action.payload?.postData || null
        },
        closeModal: (state) => {
            state.isOpen = false
            state.mode = 'create'
            state.postData = null
        }   
    }
})

export const { openModal, closeModal } = modalSlice.actions
export default modalSlice.reducer