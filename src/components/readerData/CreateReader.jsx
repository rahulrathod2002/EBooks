import React, { useState } from 'react';
import './CreateReader.css';

function CreateReader() {
    const [name, setName] = useState('');
    const [contact, setContact] = useState('');
    const [city, setCity] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const readerData = { name, contact, city };
        // Assuming there is an action to dispatch the reader data, you can use it here
        // Example: dispatch(submitReaderData(readerData));
        console.log('Reader Data Submitted: ', readerData);
    };

    return (
        <div className="create-new-reader-overlay">
            <div className="create-new-reader-container">
                <h2>Create New Reader</h2>
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
                    <button type="submit" className="submit-button">Submit</button>
                </form>
            </div>
        </div>
    );
}

export default CreateReader;
