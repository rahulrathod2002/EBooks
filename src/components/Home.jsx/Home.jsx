import React, { useState, useMemo, useCallback } from "react";
import { useSelector } from "react-redux";
import Carousel from "./Carousel";
import Search from "../books/Search";
import TopBooks from "../books/TopBooks";
import BooksList from "../books/BooksList";
import Categories from "../books/Categories";

function Home() {
    const { books } = useSelector((state) => state.books); // Access books from Redux
    const [searchTerm, setSearchTerm] = useState("");
    const [category, setCategory] = useState("");

    // Memoized filtered books
    const filteredBooks = useMemo(() => {
        return books.filter((book) => {
            const matchesSearch = book.bookName.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesCategory = category ? book.category === category : true;
            return matchesSearch && matchesCategory;
        });
    }, [books, searchTerm, category]);

    // Memoized callback for setting search term
    const handleSearch = useCallback((term) => setSearchTerm(term), []);

    // Memoized callback for setting category
    const handleCategory = useCallback((cat) => setCategory(cat), []);

    return (
        <>
            <Carousel />
            <Search books={books} setSearchTerm={handleSearch} />
            <TopBooks />
            <Categories setCategory={handleCategory} />
            <BooksList filteredBooks={filteredBooks} />
        </>
    );
}

export default React.memo(Home);
