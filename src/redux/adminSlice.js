import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isAuthenticated: false,
    username: '',
    role: '',
};

const adminSlice = createSlice({
    name: 'admin',
    initialState,
    reducers: {
        login: (state, action) => {
            state.isAuthenticated = true;
            state.username = action.payload.username;
            state.role = action.payload.role;
            localStorage.setItem('adminSession', JSON.stringify(action.payload)); // Save session in localStorage
        },
        logout: (state) => {
            localStorage.removeItem('adminSession'); // Remove session from localStorage
            state.isAuthenticated = false;
            state.username = '';
            state.role = '';
        },
        restoreSession: (state) => {
            const savedSession = localStorage.getItem('adminSession');
            if (savedSession) {
                const { username, role } = JSON.parse(savedSession);
                state.isAuthenticated = true;
                state.username = username;
                state.role = role;
            }
        },
    },
});

export const { login, logout, restoreSession } = adminSlice.actions;
export default adminSlice.reducer;
