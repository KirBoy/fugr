import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    name: 'js',
    orderBy: 'relevance',
    category: 'all',
    isSubmitted: false
}

export const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        setFilter: (state, action) => {
            state.name = action.payload.name
            state.orderBy = action.payload.orderBy
            state.category = action.payload.category
            state.isSubmitted = true
        },
        resetForm: state => {
            state.isSubmitted = false
        }
    }
})

export const {setFilter, resetForm} = filterSlice.actions

export default filterSlice.reducer