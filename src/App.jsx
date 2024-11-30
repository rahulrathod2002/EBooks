import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/footer/Footer';
import Carousel from './components/Home.jsx/Carousel';
import Search from './components/books/Search';
import BooksList from './components/books/BooksList';
import Book from './components/books/Book';
import Categories from './components/books/Categories';
import AdminLogin from './components/admin/AdminLogin';
import EditBooks from './components/admin/EditBooks';
import TopBooks from './components/books/TopBooks';
import Home from './components/Home.jsx/Home';
import AdminDashboard from './components/admin/AdminDashboard';
import AddNewBook from './components/admin/AddNewBook';
import CreateReader from './components/readerData/CreateReader';
import Readers from './components/readerData/Readers';

function App() {

  return (
    <>
      <Router>
        <Navbar />
        <h1 className='books-qoutes'>“Save your time and grow your knowledge easily”</h1>
        <Routes>
          <Route path="*" element={<h1>404 - Page Not Found</h1>} />
          <Route path="/top-books" element={<TopBooks />} />
          <Route path="/books-list" element={< BooksList />} />
          <Route path="/book" element={<Book />} />
          <Route path="/" element={< Home />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route path="/create-reader" element={<CreateReader />} />
          <Route path="/reader-data" element={<Readers />} />
          <Route path="/admin-edit/:id" element={<EditBooks />} />
          <Route path="/admin-add-new-book" element={<AddNewBook />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/footer" element={<Footer />} />
        </Routes>
        <Footer />
      </Router>
    </>
  )
}

export default App
