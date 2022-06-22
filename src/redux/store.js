import {configureStore} from "@reduxjs/toolkit";
import {booksApi} from "../api/booksApi";
import filterReducer from './slices/filterSlice'

const store = configureStore({
    reducer: {
        [booksApi.reducerPath]: booksApi.reducer,
        filter: filterReducer
    },
    middleware:(getDefaultMiddleware => getDefaultMiddleware().concat(booksApi.middleware))
})

export default store