import React, { useState } from 'react';
import './Search.css';

function FilterButton() {
    const [isOpen, setIsOpen] = useState(false);

    // Toggle the visibility of the filter options
    const toggleFilterOptions = () => {
        setIsOpen(prevState => !prevState);
    };

    return (
        <div className="filter-button-container">
            <button className="filter-button" onClick={toggleFilterOptions}>
                Filter
            </button>
            {/* Show filter options only if isOpen is true */}
            {isOpen && (
                <div className="filter-options">
                    <ul>
                        <li>Book Name</li>
                        <li>Writer/Author</li>
                        <li>Latest</li>
                    </ul>
                </div>
            )}
        </div>
    );
}

export default FilterButton;
