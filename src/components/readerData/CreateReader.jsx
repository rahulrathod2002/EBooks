import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { submitReaderData } from '../../redux/readerSlice';
import './CreateReader.css';

function CreateReader() {
    const dispatch = useDispatch();
    const [name, setName] = useState('');
    const [contact, setContact] = useState('');
    const [city, setCity] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const readerData = { name, contact, city };

        try {
            setLoading(true);
            setError('');
            setSuccessMessage('');

            const action = await dispatch(submitReaderData(readerData));

            if (submitReaderData.fulfilled.match(action)) {
                setSuccessMessage('Reader created successfully!');
                // Hide the success message after 3 seconds
                setTimeout(() => setSuccessMessage(''), 3000);
            } else {
                setError('Failed to create reader. Please try again.');
                // Hide the error message after 3 seconds
                setTimeout(() => setError(''), 3000);
            }
        } catch (error) {
            setError('An unexpected error occurred. Please try again.');
            setTimeout(() => setError(''), 3000); // Hide error after 3 seconds
        } finally {
            setLoading(false);
        }

        // Reset form fields after 2 seconds after submitting
        setTimeout(() => {
            setName('');
            setContact('');
            setCity('');
        }, 2000);
    };

    return (
        <div className="create-new-reader-overlay">
            <div className="create-new-reader-container">
                <h2>Create New Reader</h2>

                {error && <div className="error-message">{error}</div>} {/* Show error message */}
                {successMessage && <div className="success-message">{successMessage}</div>} {/* Show success message */}

                <form onSubmit={handleSubmit}>
                    <div className="input-field">
                        <label>Name:</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="input-field">
                        <label>Contact:</label>
                        <input
                            type="text"
                            value={contact}
                            onChange={(e) => setContact(e.target.value)}
                            required
                        />
                    </div>
                    <div className="input-field">
                        <label>City:</label>
                        <input
                            type="text"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="submit-button" disabled={loading}>
                        {loading ? 'Submitting...' : 'Submit'}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default CreateReader;
