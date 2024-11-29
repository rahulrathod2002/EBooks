import React, { useEffect, Suspense } from "react";
import "./BooksList.css";
import { useSelector, useDispatch } from "react-redux";
import { fetchBooks, selectBook, clearSelectedBook } from "../../redux/booksSlice";

const Book = React.lazy(() => import("./Book"));

function BooksList({ filteredBooks }) {
    const dispatch = useDispatch();
    const { books, status, error, selectedBook } = useSelector((state) => state.books);

    useEffect(() => {
        if (status === "idle") {
            dispatch(fetchBooks());
        }
    }, [dispatch, status]);

    if (status === "loading") {
        return <div className="loading-message">Loading books...</div>;
    }

    if (status === "failed") {
        return <div className="error-message">Error: {error}</div>;
    }

    const displayBooks = filteredBooks || books; // Use filtered books if available

    if (!Array.isArray(displayBooks) || displayBooks.length === 0) {
        return <div className="error-message">No books available.</div>;
    }

    const openBookDetails = (book) => {
        dispatch(selectBook(book));
    };

    const closeBookDetails = () => {
        dispatch(clearSelectedBook());
    };

    return (
        <div className="books-list-container">
            <ul className="books-unordered-list">
                {displayBooks.map((book, index) => (
                    <li key={index} className="books-card">
                        {book.coverImageBase64 ? (
                            <img
                                className="books-card-img"
                                src={`data:image/jpeg;base64,${book.coverImageBase64}`}
                                alt={book.bookName}
                            />
                        ) : (
                            <div className="no-image">No cover image</div>
                        )}
                        <h2 className="books-card-title">{book.bookName}</h2>
                        <h3 className="books-card-author">{book.writerName}</h3>
                        <h4 className="books-card-type">Free</h4>
                        <button
                            className="books-card-button"
                            onClick={() => openBookDetails(book)}
                        >
                            Download
                        </button>
                    </li>
                ))}
            </ul>

            {selectedBook && (
                <Suspense fallback={<div className="loading-message">Loading book details...</div>}>
                    <Book book={selectedBook} onClose={closeBookDetails} />
                </Suspense>
            )}
        </div>
    );
}

export default BooksList;







// import React, { useState } from 'react';
// import './BooksList.css';
// import book1 from '../../assets/book.jpg';
// import fantasy from '../../assets/fantasy.webp';
// import design from '../../assets/design.jpg';
// import horror from '../../assets/horror.jpg';
// import theGreat from '../../assets/TheGreat.jpg';
// import thrill from '../../assets/thrill.jpg';
// import Book from './Book';

// import bookListURL from '../../Api.js/books/getList'

// function BooksList() {
//     const [selectedBook, setSelectedBook] = useState(null);

//     const books = [
//         {
//             img: book1,
//             title: "Book 1",
//             author: "Author 1",
//             description: "This is a brief description of Book 1."
//         },
//         {
//             img: fantasy,
//             title: "Fantasy World",
//             author: "Author 2",
//             description: "Dive into the fantasy world with this amazing book."
//         },
//         {
//             img: design,
//             title: "Design Principles",
//             author: "Author 3",
//             description: "Learn the fundamentals of design with this book."
//         },
//         {
//             img: horror,
//             title: "Horror Tales",
//             author: "Author 4",
//             description: "Get spooked with these chilling horror stories."
//         },
//         {
//             img: theGreat,
//             title: "The Great Adventures",
//             author: "Author 5",
//             description: "Join the thrilling adventures in this captivating story."
//         },
//         {
//             img: thrill,
//             title: "Thriller Nights",
//             author: "Author 6",
//             description: "An edge-of-your-seat thriller you won't put down."
//         },
//         {
//             img: book1,
//             title: "Book 2",
//             author: "Author 2",
//             description: "This is a brief description of Book 1."
//         },
//         {
//             img: fantasy,
//             title: "Fantasy World",
//             author: "Author 7",
//             description: "Dive into the fantasy world with this amazing book."
//         },
//         {
//             img: design,
//             title: "Design Principles",
//             author: "Author 8",
//             description: "Learn the fundamentals of design with this book."
//         },
//         {
//             img: horror,
//             title: "Horror Tales",
//             author: "Author 9",
//             description: "Get spooked with these chilling horror stories."
//         },
//         {
//             img: theGreat,
//             title: "The Great Adventures",
//             author: "Author 10",
//             description: "Join the thrilling adventures in this captivating story."
//         },
//         {
//             img: thrill,
//             title: "Thriller Nights",
//             author: "Author 11",
//             description: "An edge-of-your-seat thriller you won't put down."
//         }
//     ];

//     const openBookDetails = (book) => {
//         setSelectedBook(book);
//     };

//     const closeBookDetails = () => {
//         setSelectedBook(null);
//     };

//     return (
//         <div className="books-list-container">
//             <ul className="books-unordered-list">
//                 {books.map((book, index) => (
//                     <li key={index} className="books-card">
//                         <img className="books-card-img" src={book.img} alt={book.title} />
//                         <h2 className="books-card-title">{book.title}</h2>
//                         <h3 className="books-card-author">{book.author}</h3>
//                         <h4 className="books-card-type">Free</h4>
//                         <button
//                             className="books-card-button"
//                             onClick={() => openBookDetails(book)}
//                         >
//                             Download
//                         </button>
//                     </li>
//                 ))}
//             </ul>
//             {selectedBook && (
//                 <Book book={selectedBook} onClose={closeBookDetails} />
//             )}
//         </div>
//     );
// }

// export default BooksList;
