import { API_URL } from "../config/env.ts";
import axios from 'axios';

// Pobieranie listy nawyków użytkownika
export const getHabits = async (userId: number) => {
  const response = await axios.get(`${API_URL}/userhabits/${userId}`);
  return response.data;
};

// Tworzenie nowego nawyku
export const createHabit = async (userId: number, habitData: { name: string }) => {
  const response = await axios.post(`${API_URL}/userhabits/${userId}`, habitData);
  return response.data;
};

// Usuwanie nawyku
export const deleteHabit = async (habitId: number) => {
  const response = await axios.delete(`${API_URL}/userhabits/${habitId}`);
  return response.data;
};

// export const executeCreate = async (userId: number, habitName: string) => {
//   const response = await fetch(`${API_URL}/habits/${userId}`, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify({ name: habitName }),
//   });

//   if (!response.ok) {
//     throw new Error('Failed to create habit');
//   }

//   const newHabit = await response.json();
//   return newHabit;
// };
