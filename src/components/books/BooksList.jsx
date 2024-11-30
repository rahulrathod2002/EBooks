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
