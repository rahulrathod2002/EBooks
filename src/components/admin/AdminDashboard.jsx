import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../redux/adminSlice';
import { useNavigate } from 'react-router-dom';
import './AdminDashboard.css';

function AdminDashboard() {
    const adminData = useSelector((state) => state.admin);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(logout());
        navigate('/admin-login');
    };
    const handleAddNewBook = () => {
        navigate('/admin-add-new-book');
    };
    const handleUpdateTopBook = () => {
        navigate('/top-books');
    };
    const handleUpdateBook = () => {
        navigate('/books-list');
    };
    const handleCreateReader = () => {
        navigate('/create-reader');
    };
    const handleReadersData = () => {
        navigate('/reader-data');
    };

    return (
        <div className="admin-dashboard">
            <div className="dashboard-header">
                <h1>Welcome, {adminData.username}</h1>
                <p>Role: {adminData.role}</p>
            </div>

            <div className="dashboard-content">
                <h2>Admin Dashboard</h2>
                <p>This is your admin dashboard where you can manage the system.</p>

                <button className="admin-dashboard-readers-data-button" onClick={handleReadersData}>Readers Data</button>
                <button className="admin-dashboard-create-reader-button" onClick={handleCreateReader}> Add New Reader</button>
                <button className="admin-dashboard-add-new-book-button" onClick={handleAddNewBook}>Add New Book</button>
                <button className="admin-dashboard-update-top-books-button" onClick={handleUpdateTopBook}>Update Top Books</button>
                <button className="admin-dashboard-update-existing-books-button" onClick={handleUpdateBook}>Update Existing Books</button>
                <button className="admin-dashboard-logout-button" onClick={handleLogout}>Logout</button>
            </div>
        </div>
    );
}

export default AdminDashboard;
