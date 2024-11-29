import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addBook } from '../../redux/booksSlice';
import './AddNewBook.css';

function AddNewBook() {
  const dispatch = useDispatch();
  const [newBook, setNewBook] = useState({
    name: '',
    author: '',
    description: '',
    category: '',
    coverImage: null,
    pdfFile: null,
  });

  // Handle input change for text fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewBook({
      ...newBook,
      [name]: value,
    });
  };

  // Handle file input change
  const handleFileChange = (e) => {
    const { name } = e.target;
    const file = e.target.files[0];
    setNewBook({
      ...newBook,
      [name]: file,
    });
  };

  // Handle form submission
  const handleAddBook = () => {
    const formData = new FormData();
    formData.append('bookName', newBook.name);
    formData.append('writerName', newBook.author);
    formData.append('description', newBook.description);
    formData.append('category', newBook.category);

    if (newBook.coverImage) formData.append('coverImage', newBook.coverImage);
    if (newBook.pdfFile) formData.append('pdfFile', newBook.pdfFile);

    dispatch(addBook(formData));
  };

  return (
    <div className="add-new-book-container">
      <h1>Add New Book</h1>

      <label>Cover Image</label>
      <input type="file" name="coverImage" accept="image/*" onChange={handleFileChange} />

      <label>PDF File</label>
      <input type="file" name="pdfFile" accept=".pdf" onChange={handleFileChange} />

      <input
        type="text"
        name="name"
        placeholder="Book Name"
        value={newBook.name}
        onChange={handleInputChange}
      />
      <input
        type="text"
        name="author"
        placeholder="Author Name"
        value={newBook.author}
        onChange={handleInputChange}
      />
      <textarea
        name="description"
        placeholder="Book Description"
        value={newBook.description}
        onChange={handleInputChange}
      />
      <input
        type="text"
        name="category"
        placeholder="Category"
        value={newBook.category}
        onChange={handleInputChange}
      />

      <button onClick={handleAddBook}>Add Book</button>
    </div>
  );
}

export default AddNewBook;
