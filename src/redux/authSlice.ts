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

// Funkcja pomocnicza do pobrania tylko userId z localStorage
const getUserIdFromLocalStorage = () => {
  const savedUser = localStorage.getItem("user");
  const user = savedUser ? JSON.parse(savedUser) : null;
  return user ? user.userId : null;  // Zwróci userId lub null, jeśli nie ma w localStorage
};

// Początkowy stan
const initialState = {
  user: getUserFromLocalStorage(),
  redirectPath: '', // Dodajemy zmienną do przechowywania ścieżki przekierowania
  loading: false,
  userId: getUserIdFromLocalStorage(),
  error: null,
};

// Tworzymy slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
      state.userId = action.payload.userId;  // Przypisujemy userId po zalogowaniu
      state.redirectPath = ''; // Resetujemy ścieżkę przekierowania po zalogowaniu
      saveUserToLocalStorage(action.payload); // zapisujemy dane użytkownika w localStorage
    },
    logout: (state) => {
      state.user = null;
      state.userId = null; // Resetujemy userId po wylogowaniu
      state.redirectPath = '/'; // Resetujemy ścieżkę przekierowania po wylogowaniu
      localStorage.removeItem("user"); // usuwamy dane użytkownika z localStorage
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setRedirectPath: (state, action) => {
      state.redirectPath = action.payload; // Nowa akcja do ustawienia ścieżki przekierowania
    },
  },
});

// Eksportujemy akcje i reducer
export const { login, logout, setError, setRedirectPath } = authSlice.actions;
export default authSlice.reducer;
