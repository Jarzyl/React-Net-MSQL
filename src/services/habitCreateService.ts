import { API_URL } from "../config/env";

export const executeCreate = async (userId: number, habitName: string) => {
    const response = await fetch(`${API_URL}/userhabits/${userId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: habitName }),
    });
  
    if (!response.ok) {
      throw new Error('Failed to create habit');
    }
  
    const newHabit = await response.json();
    return newHabit;
  };