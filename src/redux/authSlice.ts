import { createSlice } from "@reduxjs/toolkit";

// Funkcja pomocnicza do zapisania użytkownika w localStorage
const saveUserToLocalStorage = (user) => {
  localStorage.setItem("user", JSON.stringify(user));
};

// Funkcja pomocnicza do pobrania użytkownika z localStorage
const getUserFromLocalStorage = () => {
  const savedUser = localStorage.getItem("user");
  return savedUser ? JSON.parse(savedUser) : null;
};

// Początkowy stan
const initialState = {
  user: getUserFromLocalStorage(),
  loading: false,
  error: null,
};

// Tworzymy slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
      saveUserToLocalStorage(action.payload); // zapisujemy dane użytkownika w localStorage
    },
    logout: (state) => {
      state.user = null;
      localStorage.removeItem("user"); // usuwamy dane użytkownika z localStorage
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

// Eksportujemy akcje i reducer
export const { login, logout, setError } = authSlice.actions;
export default authSlice.reducer;
