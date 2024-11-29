import React, { useState, useMemo, useCallback } from "react";
import "./Search.css";

function Search({ books, setSearchTerm }) {
    const [query, setQuery] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const [selectedFilter, setSelectedFilter] = useState("all");

    const handleInputChange = useCallback(
        (e) => {
            const value = e.target.value;
            setQuery(value);

            if (!value.trim()) {
                setSearchTerm(""); // Clear search term on empty input
                setSuggestions([]);
                return;
            }

            const lowerCaseQuery = value.toLowerCase();
            const filteredSuggestions = books
                .filter((book) =>
                    ["bookName", "writerName", "category"]
                        .filter((key) => selectedFilter === "all" || key === selectedFilter)
                        .some((key) => book[key].toLowerCase().includes(lowerCaseQuery))
                )
                .slice(0, 5);

            setSuggestions(filteredSuggestions);
        },
        [books, selectedFilter, setSearchTerm]
    );

    const handleSearch = useCallback(() => {
        setSearchTerm(query);
        setSuggestions([]);
    }, [query, setSearchTerm]);

    return (
        <div className="books-search-bar-container">
            <input
                type="text"
                className="books-search-input"
                value={query}
                onChange={handleInputChange}
                placeholder="Search books..."
            />
            <select
                className="filter-select"
                value={selectedFilter}
                onChange={(e) => setSelectedFilter(e.target.value)}
            >
                <option value="all">All</option>
                <option value="bookName">Book Name</option>
                <option value="writerName">Author</option>
                <option value="category">Category</option>
            </select>
            <button className="books-search-button" onClick={handleSearch}>
                Search
            </button>
            {query && suggestions.length > 0 && (
                <ul className="search-suggestions-container">
                    {suggestions.map((suggestion, index) => (
                        <li
                            key={index}
                            onClick={() => {
                                setQuery(suggestion.bookName);
                                setSearchTerm(suggestion.bookName);
                            }}
                        >
                            {suggestion.bookName} by {suggestion.writerName}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default React.memo(Search);
