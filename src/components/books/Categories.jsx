import React, { useCallback } from "react";
import "./Categories.css";
import fantasy from "../../assets/fantasy.webp";
import design from "../../assets/design.jpg";
import horror from "../../assets/horror.jpg";
import theGreat from "../../assets/TheGreat.jpg";
import thrill from "../../assets/thrill.jpg";

// Array of book categories
const books = [
    { img: fantasy, type: "Fantasy" },
    { img: design, type: "Design" },
    { img: horror, type: "Horror" },
    { img: theGreat, type: "Adventure" },
    { img: thrill, type: "Thriller" },
];

function Categories({ setCategory }) {
    const handleCategoryClick = useCallback((type) => {
        setCategory(type); // Set selected category in Home
    }, [setCategory]);

    return (
        <div className="books-categories-container">
            <h1 className="books-categories-heading">Book Categories</h1>
            <ul className="books-categories-unordered-list">
                {books.map((cat, index) => (
                    <li key={index} className="books-categories-card" onClick={() => handleCategoryClick(cat.type)}>
                        <img src={cat.img} alt={cat.type} className="books-categories-img" />
                        <h2 className="books-categories-title">{cat.type}</h2>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default React.memo(Categories);
