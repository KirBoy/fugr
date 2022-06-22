import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";


export const booksApi = createApi({
    reducerPath: 'booksApi',
    baseQuery: fetchBaseQuery({baseUrl: 'https://www.googleapis.com/books/v1/'}),
    endpoints: build => ({
        getBooks: build.query({
            query: (arg) => {
                const [name, orderBy, startIndex] = arg
                return 'volumes?q=' + name +
                    '&startIndex=' + startIndex * 30 +
                    '&maxResults=30&orderBy=' + orderBy + '&key=AIzaSyBx9OTJGXpYf8efwt9FZiATxOivxzzXBO0'
            },
        }),
        getBookById: build.query({
            query: (id) => ('/volumes/' + id),
        }),
    }),

})

export const {useGetBooksQuery, useGetBookByIdQuery} = booksApi