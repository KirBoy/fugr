import {createSlice} from "@reduxjs/toolkit";
import {useGetBooksQuery} from "../../api/booksApi";
const initialState = {
    books: []
}

export const booksSlice = createSlice({
    name: 'books',
    initialState,
    reducers : {
        get: state => {
            const {data} = useGetBooksQuery()
            state.books = data
        }
    }
})

export const { get,} = booksSlice.actions

export default booksSlice.reducer