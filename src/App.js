import React from "react";
import {
    Routes,
    Route,
} from "react-router-dom";
import Book from "./components/pages/Book";
import BooksList from "./components/pages/BooksList";
import PageNotFound from "./components/pages/PageNotFound";
import Search from "./components/Search";

function App() {
    return (
        <Routes>
            <Route element={<Search/>}>
                <Route path="/" element={<BooksList/>}/>
                <Route path="/:id" element={<Book/>}/>
            </Route>
            <Route path="*" element={<PageNotFound/>}/>
        </Routes>
    );
}
export default App;
