import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { updateBook } from '../../redux/booksSlice';
import './EditBooks.css';

function EditBooks() {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const books = useSelector((state) => state.books.books);
    const [book, setBook] = useState({});
    const [initialBook, setInitialBook] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const selectedBook = books.find((b) => b.id === parseInt(id, 10));

    useEffect(() => {
        if (selectedBook) {
            setBook({ ...selectedBook });
            setInitialBook({ ...selectedBook });
        }
    }, [selectedBook]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setBook((prevBook) => ({
            ...prevBook,
            [name]: value,
        }));
    };

    const handleFileChange = (e) => {
        const { name } = e.target;
        const file = e.target.files[0];
        setBook((prevBook) => ({
            ...prevBook,
            [name]: file,
        }));
    };

    const handleUpdate = () => {
        if (!initialBook) return;

        const formData = new FormData();
        Object.keys(book).forEach((key) => {
            if (book[key] !== initialBook[key] || book[key] instanceof File) {
                formData.append(key, book[key]);
            }
        });

        setIsLoading(true);

        dispatch(updateBook({ id: book.id, formData }))
            .then(() => {
                alert("Book updated successfully!");
                setTimeout(() => {
                    navigate('/admin-dashboard');
                }, 3000);
            })
            .catch((err) => {
                console.error("Error updating book:", err);
                alert("Failed to update the book. Please try again.");
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    if (!books || books.length === 0) {
        return <div>Loading books...</div>;
    }

    if (!selectedBook) {
        return <div>Book not found.</div>;
    }

    return (
        <div className="admin-books-edit-container">
            <h1>Edit Book</h1>

            <div className="new-admin-books-edit-container">
                <h2>Edit Book Information</h2>

                <label>Cover Image</label>
                <input
                    type="file"
                    name="coverImage"
                    accept="image/*"
                    onChange={handleFileChange}
                />
                <label>PDF File</label>
                <input
                    type="file"
                    name="pdfFile"
                    accept=".pdf"
                    onChange={handleFileChange}
                />

                <input
                    type="text"
                    name="name"
                    placeholder="Book Name"
                    value={book.name || ''}
                    onChange={handleInputChange}
                />
                <input
                    type="text"
                    name="author"
                    placeholder="Author Name"
                    value={book.author || ''}
                    onChange={handleInputChange}
                />
                <textarea
                    name="description"
                    placeholder="Book Description"
                    value={book.description || ''}
                    onChange={handleInputChange}
                />
                <input
                    type="text"
                    name="category"
                    placeholder="Category"
                    value={book.category || ''}
                    onChange={handleInputChange}
                />

                <button
                    className="admin-edit-book-update-button"
                    onClick={handleUpdate}
                    disabled={isLoading}
                >
                    {isLoading ? "Updating..." : "Update"}
                </button>
            </div>
        </div>
    );
}

export default EditBooks;
