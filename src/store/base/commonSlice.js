import { createSlice } from '@reduxjs/toolkit'

export const initialState = {
    base: ''
}

export const commonSlice = createSlice({
    name: 'base/common',
    initialState,
    reducers: {
        setBase: (state, action) => {
            state.base = action.payload
        }
    },
})


export const { setBase } = commonSlice.actions


export default commonSlice.reducer
