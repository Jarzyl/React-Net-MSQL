import { API_URL } from "../config/env";
import { login } from "../redux/authSlice";
import { Dispatch } from "@reduxjs/toolkit";
import { jwtDecode, JwtPayload } from "jwt-decode";
import toast from 'react-hot-toast';

// Rozszerzenie JwtPayload o userId
interface CustomJwtPayload extends JwtPayload {
  userId: string; // lub number, w zależności od typu userId
}

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
      // Próbujemy odczytać błąd jako JSON, jeśli się nie uda - jako text
      let errorMessage = "Login error.";
      try {
        const errorData = await response.json();
        errorMessage = errorData.message || "Login error.";
      } catch {
        // Jeśli odpowiedź nie jest JSON, odczytaj jako text
        const errorText = await response.text();
        errorMessage = errorText || "Login error.";
      }
      toast.error(errorMessage);
      return;
    }

    const data = await response.json();
    
    // Dekodowanie tokenu, aby wyciągnąć userId
    const decodedToken = jwtDecode<CustomJwtPayload>(data.token);
    const userId = decodedToken.userId;

    // Zapisujemy token i userId w Redux
    dispatch(login({ token: data.token, userId }));
    toast.success("Logged in successfully!");

    return data; // Opcjonalnie, jeśli chcesz zwrócić dane
  } catch (err) {
    toast.error("Connection error. Please check if the server is running.");
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
    // Próbujemy odczytać błąd jako JSON, jeśli się nie uda - jako text
    let errorMessage = "Registration error.";
    try {
      const errorData = await response.json();
      errorMessage = errorData.message || "Registration error.";
    } catch {
      const errorText = await response.text();
      errorMessage = errorText || "Registration error.";
    }
    throw new Error(errorMessage);
  }
  
  toast.success("Registration successful! You can now log in.");
}