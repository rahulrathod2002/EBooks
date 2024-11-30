import React from 'react';
import './TopBooks.css'; // Ensure the correct path and name
import top1 from '../../assets/TopBook1.webp';
import top2 from '../../assets/TopBook2.png';


//these are static books, but later include API's data(make it as top book, from <BooksList/>)
function TopBooks() {
    return (
        <div className='top-books-container'>
            {/* Book 1 */}
            <div className='book-box'>
                <img src={top1} alt='Top Book 1' className='book-image' />
            </div>
            {/* Book 2 */}
            <div className='book-box'>
                <img src={top2} alt='Top Book 2' className='book-image' />
            </div>
        </div>
    );
}

export default TopBooks;
