import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { restoreSession } from '../redux/adminSlice';
import './Navbar.css';
import menuIcon from '../assets/list.png';

function Navbar() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [menuOpen, setMenuOpen] = useState(false); // State to control menu visibility

    // Access authentication state from Redux store
    const { isAuthenticated, username } = useSelector((state) => state.admin);

    // Restore session when the component mounts
    useEffect(() => {
        dispatch(restoreSession());
    }, [dispatch]);

    const handleSignIn = () => {
        navigate('/admin-login');
    };

    const handleAdminClick = () => {
        navigate('/admin-dashboard');
    };

    const handleHomeClick = () => {
        navigate('/');
    };

    const handleBooksClick = () => {
        navigate('/books-list');
    };

    const handleAboutUsClick = () => {
        window.scrollTo({ top: document.body.scrollHeight / 2, behavior: 'smooth' });
    };

    const handleContactClick = () => {
        window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    };

    // Close the menu when clicking outside
    useEffect(() => {
        const closeMenu = (e) => {
            if (!e.target.closest('.books-navbar-container')) {
                setMenuOpen(false);
            }
        };

        document.addEventListener('click', closeMenu);
        return () => document.removeEventListener('click', closeMenu);
    }, []);

    return (
        <nav className="books-navbar-container">
            <div className="books-navbar-logo" onClick={handleHomeClick}>
                BookHub
            </div>
            <div className="books-navbar-right">
                <ul className={`books-navbar-links ${menuOpen ? 'show-menu' : ''}`}>
                    <li onClick={handleHomeClick}>Home</li>
                    <li onClick={handleBooksClick}>Books</li>
                    <li onClick={handleAboutUsClick}>About Us</li>
                    <li onClick={handleContactClick}>Contact</li>
                </ul>
                {!isAuthenticated ? (
                    <button className="books-navbar-signin" onClick={handleSignIn}>
                        Sign In
                    </button>
                ) : (
                    <button className="books-navbar-signin" onClick={handleAdminClick}>
                        Admin
                    </button>
                )}
                <img
                    src={menuIcon}
                    alt="menu"
                    className="books-navbar-menu-icon"
                    onClick={() => setMenuOpen(!menuOpen)}
                />
            </div>
        </nav>
    );
}

export default Navbar;
