import React from "react";

interface Habit {
  id: number;
  name: string;
  createdAt: string;
  userName: string;
}

interface ForumHabitsProps {
  habits: Habit[];
}

const ForumHabits: React.FC<ForumHabitsProps> = ({ habits }) => {
  return (
    <div className="container p-4 mx-auto pt-60">
      {/* Nagłówek */}
      <h1 className="mb-6 text-2xl font-bold text-center">Forum Nawyków</h1>

      {/* Lista nawyków */}
      <div className="flex flex-wrap justify-center gap-4">
        {habits.map((habit) => (
          <div
            key={habit.id}
            className="p-4 bg-white border rounded-lg shadow-md w-80"
          >
            <h2 className="mb-2 text-xl font-semibold">{habit.name}</h2>
            <p className="text-sm text-gray-500">
              Utworzono: {new Date(habit.createdAt).toLocaleString()}
            </p>
            <p className="mt-1 text-gray-700">Autor: {habit.userName}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ForumHabits;
