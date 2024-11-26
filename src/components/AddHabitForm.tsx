import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addHabit } from "../redux/habitsSlice.ts";

const AddHabitForm: React.FC = () => {
  const [habitName, setHabitName] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (habitName.trim()) {
      dispatch(addHabit(habitName));
      setHabitName("");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto p-4 bg-white shadow-md rounded-lg mt-20 mb-20"
    >
      <div className="mb-4">
        <label
          htmlFor="habitName"
          className="block text-lg font-medium text-gray-700 mb-2"
        >
          Dodaj nowy nawyk
        </label>
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
        className="w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Dodaj
      </button>
    </form>
  );
};

export default AddHabitForm;
