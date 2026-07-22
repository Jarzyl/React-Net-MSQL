import { API_URL } from "../config/env";
import axios from "axios";

// Pobieranie listy nawyków użytkownika
export const getMainHabits = async () => {
  try {
    const response = await axios.get(`${API_URL}/mainhabits`);
    return response.data;
  } catch (error) {
    console.error("Error fetching habits:", error);
    throw new Error(
      (error as any).response?.data?.message || "Nie udało się pobrać nawyków."
    );
  }
};
