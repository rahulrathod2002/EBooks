import { configureStore } from '@reduxjs/toolkit';
import adminReducer from './adminSlice';
import booksReducer from './booksSlice';
import readerReducer from './readerSlice';

const store = configureStore({
    reducer: {
        admin: adminReducer,
        books: booksReducer,
        reader: readerReducer,
    },
});

export default store;
