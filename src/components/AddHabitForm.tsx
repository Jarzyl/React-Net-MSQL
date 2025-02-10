import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useCreateHabitMutation } from "../services/habitQueryService";

const AddHabitForm: React.FC = () => {
  const [habitName, setHabitName] = useState("");
  
  // Pobranie userId z Redux (zakładając, że użytkownik jest zapisany w stanie auth)
  const userId = useSelector((state: any) => state.auth.userId);

  // Używamy mutacji do dodania nawyku
  const mutation = useCreateHabitMutation(userId);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (habitName.trim() && userId) {
      // Wywołanie mutacji z nazwą nawyku
      mutation.mutate(habitName);

      // Resetowanie formularza po dodaniu nawyku
      setHabitName('');
    } else {
      console.log("User ID is not available or habit name is empty");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md p-4 mx-auto mt-20 mb-20 bg-white rounded-lg shadow-md"
    >
      <div className="mb-4">
        <input
          id="habitName"
          type="text"
          value={habitName}
          onChange={(e) => setHabitName(e.target.value)}
          placeholder="Nowy nawyk"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>
      <button
        type="submit"
        className="w-full py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Dodaj
      </button>
    </form>
  );
};

export default AddHabitForm;
