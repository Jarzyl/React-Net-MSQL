import { Middleware } from "@reduxjs/toolkit";
import { setRedirectPath } from "../redux/authSlice.ts"; // Importujesz akcję setRedirectPath

const authMiddleware: Middleware = (store) => (next) => (action) => {
  const result = next(action);

  // Pobieramy aktualny stan użytkownika
  const { user, redirectPath } = store.getState().auth;

  // Logika do ustawiania redirectPath
  if (user && ["/login", "/register"].includes(window.location.pathname)) {
    store.dispatch(setRedirectPath('/dashboard')); // Zapisujemy ścieżkę przekierowania
  } else if (!user && ["/habits", "/dashboard"].includes(window.location.pathname)) {
    store.dispatch(setRedirectPath('/login')); // Zapisujemy ścieżkę przekierowania
  }

  return result;
};

export default authMiddleware;
