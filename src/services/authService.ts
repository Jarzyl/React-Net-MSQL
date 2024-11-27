import { API_URL } from "../config/env.ts";
import { setError, login } from "../redux/authSlice.ts";
import { Dispatch } from "@reduxjs/toolkit";

export const loginUser = async (
  email: string,
  password: string,
  dispatch: Dispatch
) => {
  try {
    const response = await fetch(`${API_URL}/account/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      dispatch(setError(errorData.message || "Błąd logowania."));
      return;
    }

    const data = await response.json();
    dispatch(login({ token: data.token }));
    return data; // Opcjonalnie, jeśli chcesz zwrócić jakieś dane
  } catch (err) {
    dispatch(setError("Wystąpił błąd. Spróbuj ponownie."));
    console.error(err);
  }
};

export async function registerUser(data: {
    userName: string;
    lastName: string;
    email: string;
    password: string;
  }): Promise<void> {
    const response = await fetch(`${API_URL}/account/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Błąd rejestracji.");
    }
  }
  
