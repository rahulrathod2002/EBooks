import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import './Readers.css';
import { getReaderList, deleteReader } from '../../redux/readerSlice';
import edit_icon from '../../assets/edit.png';
import delete_icon from '../../assets/delete.png';

function Readers() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const readers = useSelector((state) => state.reader.list);
    const status = useSelector((state) => state.reader.status);

    useEffect(() => {
        dispatch(getReaderList());
    }, [dispatch]);

    const handleCreateReader = () => {
        navigate('/create-reader');
    };

    const handleDeleteReader = (id) => {
        dispatch(deleteReader(id));
    };

    const handleEditReader = (id) => {
        navigate(`/edit-reader/${id}`);
    };

    if (status === 'loading') {
        return <div>Loading...</div>;
    }

    return (
        <div className="readers-data-container">
            <button className="create-reader-button" onClick={handleCreateReader}>
                Create New Reader
            </button>

            <table className="readers-table">
                <thead>
                    <tr>
                        <th>Sr. No.</th>
                        <th>Name</th>
                        <th>City</th>
                        <th>Update</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {readers.map((reader, index) => (
                        <tr key={reader.id}>
                            <td>{index + 1}</td>
                            <td>{reader.name}</td>
                            <td>{reader.city}</td>
                            <td>
                                <img
                                    className="edit-icon"
                                    src={edit_icon}
                                    alt="Edit"
                                    onClick={() => handleEditReader(reader.id)}
                                />
                            </td>
                            <td>
                                <img
                                    className="delete-icon"
                                    src={delete_icon}
                                    alt="Delete"
                                    onClick={() => handleDeleteReader(reader.id)}
                                />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Readers;
