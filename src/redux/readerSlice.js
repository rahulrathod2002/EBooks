import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import APIs from '../Api';  // Import the APIs.js file

// Async action to submit reader data (Create)
export const submitReaderData = createAsyncThunk(
    'reader/submitReaderData',
    async (readerData, { rejectWithValue }) => {
        try {
            const response = await axios.post(APIs.reader.create, readerData); // API for creating a new reader
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

// Async action to fetch reader list (Read)
export const getReaderList = createAsyncThunk(
    'reader/getReaderList',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get(APIs.reader.getList); // API to fetch the list of readers
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

// Async action to update reader data (Update)
export const updateReaderData = createAsyncThunk(
    'reader/updateReaderData',
    async ({ id, readerData }, { rejectWithValue }) => {
        try {
            const response = await axios.put(APIs.reader.update(id), readerData); // API to update reader data
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

// Async action to delete a reader (Delete)
export const deleteReader = createAsyncThunk(
    'reader/deleteReader',
    async (id, { rejectWithValue }) => {
        try {
            await axios.delete(APIs.reader.delete(id));  // API to delete a reader
            return id;  // Return the ID of the deleted reader to remove from the state
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

const readerSlice = createSlice({
    name: 'reader',
    initialState: {
        list: [], // Array to hold the list of readers
        name: '',
        contact: '',
        city: '',
        status: 'idle', // idle | loading | succeeded | failed
        error: null,
    },
    reducers: {
        setReaderData: (state, action) => {
            state.name = action.payload.name;
            state.contact = action.payload.contact;
            state.city = action.payload.city;
        },
        clearReaderData: (state) => {
            state.name = '';
            state.contact = '';
            state.city = '';
        },
    },
    extraReducers: (builder) => {
        builder
            // Create Reader
            .addCase(submitReaderData.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(submitReaderData.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.list.push(action.payload);  // Add the new reader to the list
            })
            .addCase(submitReaderData.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })

            // Fetch Reader List
            .addCase(getReaderList.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getReaderList.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.list = action.payload;  // Set the list of readers
            })
            .addCase(getReaderList.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })

            // Update Reader
            .addCase(updateReaderData.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(updateReaderData.fulfilled, (state, action) => {
                state.status = 'succeeded';
                const updatedReader = action.payload;
                state.list = state.list.map((reader) =>
                    reader.id === updatedReader.id ? updatedReader : reader
                );  // Update the reader in the list
            })
            .addCase(updateReaderData.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })

            // Delete Reader
            .addCase(deleteReader.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(deleteReader.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.list = state.list.filter((reader) => reader.id !== action.payload);  // Remove the deleted reader
            })
            .addCase(deleteReader.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            });
    },
});

export const { setReaderData, clearReaderData } = readerSlice.actions;
export default readerSlice.reducer;
