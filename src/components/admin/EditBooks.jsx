import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateBook } from '../../redux/booksSlice';
import './EditBooks.css';

function EditBooks() {
    const dispatch = useDispatch();
    const [book, setBook] = useState({
        id: 1, // Replace with the actual ID of the book being edited
        name: '',
        author: '',
        description: '',
        category: '',
        coverImage: null,
        pdfFile: null,
    });

    // Handle input changes for text fields
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setBook({
            ...book,
            [name]: value,
        });
    };

    // Handle file input changes
    const handleFileChange = (e) => {
        const { name } = e.target;
        const file = e.target.files[0];
        setBook({
            ...book,
            [name]: file,
        });
    };

    // Handle book update submission
    const handleUpdate = () => {
        const formData = new FormData();
        formData.append('bookName', book.name);
        formData.append('writerName', book.author);
        formData.append('description', book.description);
        formData.append('category', book.category);
        if (book.coverImage) formData.append('coverImage', book.coverImage);
        if (book.pdfFile) formData.append('pdfFile', book.pdfFile);

        dispatch(updateBook({ id: book.id, formData }));
    };

    return (
        <div className="admin-books-edit-container">
            <h1>Edit Book</h1>

            <div className="new-admin-books-edit-container">
                <h2>Edit Book Information</h2>

                <label>Cover Image</label>
                <input type="file" name="coverImage" accept="image/*" onChange={handleFileChange} />
                <label>PDF File</label>
                <input type="file" name="pdfFile" accept=".pdf" onChange={handleFileChange} />

                <input
                    type="text"
                    name="name"
                    placeholder="Book Name"
                    value={book.name}
                    onChange={handleInputChange}
                />
                <input
                    type="text"
                    name="author"
                    placeholder="Author Name"
                    value={book.author}
                    onChange={handleInputChange}
                />
                <textarea
                    name="description"
                    placeholder="Book Description"
                    value={book.description}
                    onChange={handleInputChange}
                />
                <input
                    type="text"
                    name="category"
                    placeholder="Category"
                    value={book.category}
                    onChange={handleInputChange}
                />

                <button className="admin-edit-book-update-button" onClick={handleUpdate}>
                    Update
                </button>
            </div>
        </div>
    );
}

export default EditBooks;
