import React, { useEffect, useState } from 'react';
import './AdminLogin.css';
import adminLogin from '../../assets/adminLogin.jpg';
import { useDispatch, useSelector } from 'react-redux';
import { login, restoreSession } from '../../redux/adminSlice';
import { useNavigate } from 'react-router-dom';

function AdminLogin() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isAuthenticated = useSelector((state) => state.admin.isAuthenticated);

    // Restore session on component load
    useEffect(() => {
        dispatch(restoreSession());
    }, [dispatch]);

    // Redirect to dashboard if already authenticated
    useEffect(() => {
        if (isAuthenticated) {
            navigate('/');
        }
    }, [isAuthenticated, navigate]);

    const handleLogin = () => {
        if (username === 'admin' && password === 'admin') {
            const adminData = { username: 'admin', role: 'Administrator' };
            dispatch(login(adminData));
            alert('Login Successful!');
        } else {
            alert('Invalid Credentials');
        }
    };

    return (
        <div className="admin-login-container">
            <img className="admin-login-logo-img" src={adminLogin} alt="Admin Login" />
            <h2>Admin Login</h2>

            <input
                type="text"
                id="username"
                placeholder="USERNAME"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <input
                type="password"
                id="password"
                placeholder="PASSWORD"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />

            <button className="admin-login-button" onClick={handleLogin}>
                Login
            </button>
        </div>
    );
}

export default AdminLogin;
