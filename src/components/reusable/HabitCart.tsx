import React from "react";
import { Habit } from "../../models/interfaces/habit";

interface HabitCardProps {
  habit: Habit;
  onToggle: (id: number) => void;
  onRemove: (id: number) => void;
}

const HabitCard: React.FC<HabitCardProps> = ({ habit, onToggle, onRemove }) => {
  return (
    <div
      key={habit.id}
      className={`grid items-center p-4 w-96 h-52 rounded-lg border ${
        habit.completed ? "bg-gray-200" : "bg-white shadow-md"
      }`}
    >
      <div className="flex justify-between space-x-3">
        <span
          className={`flex-1 ${
            habit.completed ? "line-through text-gray-500" : ""
          }`}
        >
          {habit.name}
        </span>
        <p className="text-gray-700">
          {new Date(habit.createdAt).toLocaleString()}
        </p>
      </div>
      <div className="space-x-2">
        <button
          onClick={() => onToggle(habit.id)}
          className="px-3 py-1 text-white bg-green-500 rounded hover:bg-green-600"
        >
          Toggle
        </button>
        <button
          onClick={() => onRemove(habit.id)}
          className="px-3 py-1 text-white bg-red-500 rounded hover:bg-red-600"
        >
          Remove
        </button>
      </div>
    </div>
  );
};

export default HabitCard;
