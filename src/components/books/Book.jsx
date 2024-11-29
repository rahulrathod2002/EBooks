import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setReaderData, submitReaderData } from '../../redux/readerSlice';
import { useNavigate } from 'react-router-dom';  // Import useNavigate for routing
import APIs from '../../Api'; // Ensure your APIs file is correctly set up
import './Book.css';
import edit_icon from '../../assets/edit.png';

function Book({ book, onClose }) {
    const dispatch = useDispatch();
    const { name, contact, city, status } = useSelector((state) => state.reader);
    const selectedBook = useSelector((state) => state.books.selectedBook); // Accessing the selected book from Redux store
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);
    const navigate = useNavigate(); // useNavigate hook for routing

    const [coverImage, setCoverImage] = useState(''); // Local state to manage the cover image

    // Update coverImage when selectedBook changes
    useEffect(() => {
        if (selectedBook && selectedBook.coverImage) {
            setCoverImage(selectedBook.coverImage); // Assuming coverImage is a URL or Base64 string
        }
    }, [selectedBook]);

    // Check if form fields are valid
    const validateForm = () => {
        return name !== '' && contact !== '' && city !== '';
    };

    useEffect(() => {
        setIsButtonDisabled(!validateForm()); // Enable button if all fields are valid
    }, [name, contact, city]);

    // Handle input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        dispatch(setReaderData({ ...{ name, contact, city }, [name]: value }));
    };

    const handleDownload = async () => {
        if (validateForm()) {
            try {
                await dispatch(submitReaderData({ name, contact, city }));

                if (status === 'succeeded') {
                    //PDF download URL
                    const downloadUrl = `${APIs.books.downloadPDF(selectedBook.id)}`;

                    const newTab = window.open(downloadUrl, '_blank');
                    if (newTab) {
                        newTab.focus();
                    } else {
                        alert('Please allow popups for this site to download the PDF.');
                    }

                    onClose();
                }
            } catch (error) {
                console.error('Error submitting reader data:', error);
                alert('Error submitting your data. Please try again.');
            }
        }
    };

    const handleEditIconClick = () => {
        navigate(`/admin-edit/${selectedBook.id}`);
    };

    if (!selectedBook) {
        return null;
    }

    return (
        <div className="book-modal-overlay" onClick={onClose}>
            <div className="book-card-center-container" onClick={(e) => e.stopPropagation()}>
                {coverImage && (
                    <img className="book-card-center-img" src={coverImage} alt={selectedBook.title} />
                )}
                <h2 className="book-card-center-title">{selectedBook.title}</h2>
                <h3 className="book-card-center-author">{selectedBook.author}</h3>
                <p className="book-card-center-description">{selectedBook.description}</p>

                <input
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    value={name}
                    onChange={handleInputChange}
                />
                <input
                    type="email"
                    name="contact"
                    placeholder="Your Contact"
                    value={contact}
                    onChange={handleInputChange}
                />
                <input
                    type="text"
                    name="city"
                    placeholder="Your City"
                    value={city}
                    onChange={handleInputChange}
                />
                <button
                    className="book-card-center-button"
                    onClick={handleDownload}
                    disabled={isButtonDisabled || status === 'loading'}
                >
                    {status === 'loading' ? 'Submitting...' : 'Submit & Download'}
                </button>

                {/* Edit Icon */}
                <img
                    className="book-card-edit-icon"
                    src={edit_icon}
                    alt="Edit"
                    onClick={handleEditIconClick}
                />
            </div>
        </div>
    );
}

export default Book;
