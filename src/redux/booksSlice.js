import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import APIs from '../Api';

// Async actions for API integration

// Fetch all books
export const fetchBooks = createAsyncThunk('books/fetchBooks', async (_, { rejectWithValue }) => {
    try {
        const response = await axios.get(APIs.books.getList);
        const booksWithBase64Images = response.data.map(book => ({
            ...book,
            coverImageBase64: book.coverImageBase64 || null,
        }));
        return booksWithBase64Images;
    } catch (error) {
        return rejectWithValue(error.response?.data || error.message);
    }
});

// Create a new book with coverImage, pdfFile, and category
export const addBook = createAsyncThunk('books/addBook', async (formData, { rejectWithValue }) => {
    try {
        const config = {
            headers: { 'Content-Type': 'multipart/form-data' },
        };
        const response = await axios.post(APIs.books.create, formData, config);
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response?.data || error.message);
    }
});

// Update an existing book with coverImage, pdfFile, and category
export const updateBook = createAsyncThunk(
    'books/updateBook',
    async ({ id, formData }, { rejectWithValue }) => {
        try {
            const config = {
                headers: { 'Content-Type': 'multipart/form-data' },
            };
            const response = await axios.put(APIs.books.update(id), formData, config);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

// Delete a book
export const deleteBook = createAsyncThunk('books/deleteBook', async (id, { rejectWithValue }) => {
    try {
        await axios.delete(APIs.books.delete(id));
        return id; // Return the deleted book's ID
    } catch (error) {
        return rejectWithValue(error.response?.data || error.message);
    }
});

// Redux Slice
const booksSlice = createSlice({
    name: 'books',
    initialState: {
        books: [], // List of all books
        selectedBook: null, // Single selected book
        status: 'idle', // Request status
        error: null, // Error messages
    },
    reducers: {
        // Select a book
        selectBook: (state, action) => {
            state.selectedBook = action.payload;
        },
        // Clear selected book
        clearSelectedBook: (state) => {
            state.selectedBook = null;
        },
    },
    extraReducers: (builder) => {
        builder
            // Fetch all books
            .addCase(fetchBooks.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchBooks.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.books = action.payload.map((book) => ({
                    ...book,
                    coverImage: book.coverImage || null,
                    pdfFile: book.pdfFile || null,
                    category: book.category || '', // Include category
                }));
            })
            .addCase(fetchBooks.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })

            // Add a book
            .addCase(addBook.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(addBook.fulfilled, (state, action) => {
                state.status = 'succeeded';
                const newBook = {
                    ...action.payload,
                    coverImage: action.payload.coverImage || null,
                    pdfFile: action.payload.pdfFile || null,
                    category: action.payload.category || '', // Include category
                };
                state.books.push(newBook);
            })
            .addCase(addBook.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })

            // Update a book
            .addCase(updateBook.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(updateBook.fulfilled, (state, action) => {
                state.status = 'succeeded';
                const index = state.books.findIndex((book) => book.id === action.payload.id);
                if (index !== -1) {
                    state.books[index] = {
                        ...state.books[index],
                        ...action.payload,
                        coverImage: action.payload.coverImage || state.books[index].coverImage,
                        pdfFile: action.payload.pdfFile || state.books[index].pdfFile,
                        category: action.payload.category || state.books[index].category, // Update category
                    };
                }
            })
            .addCase(updateBook.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })

            // Delete a book
            .addCase(deleteBook.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(deleteBook.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.books = state.books.filter((book) => book.id !== action.payload);
            })
            .addCase(deleteBook.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            });
    },
});

export const { selectBook, clearSelectedBook } = booksSlice.actions;

export default booksSlice.reducer;
