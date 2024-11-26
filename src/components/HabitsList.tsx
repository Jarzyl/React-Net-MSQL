import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleHabit, removeHabit } from '../redux/habitsSlice.ts';

const HabitList: React.FC = () => {
  const habits = useSelector((state: any) => state.habits.habits);
  const dispatch = useDispatch();

  const handleToggle = (id: number) => {
    dispatch(toggleHabit(id));
  };

  const handleRemove = (id: number) => {
    dispatch(removeHabit(id));
  };

  return (
    <div className="p-4 max-w-lg mx-auto bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold text-center mb-4">My Habits</h2>
      <ul className="space-y-4">
        {habits.map(habit => (
          <li
            key={habit.id}
            className={`flex justify-between items-center p-4 rounded-lg border ${habit.completed ? 'bg-gray-200' : 'bg-blue-100'}`}
          >
            <span
              className={`flex-1 ${habit.completed ? 'line-through text-gray-500' : ''}`}
            >
              {habit.name}
            </span>
            <div className="space-x-2">
              <button
                onClick={() => handleToggle(habit.id)}
                className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
              >
                Toggle
              </button>
              <button
                onClick={() => handleRemove(habit.id)}
                className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Remove
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default HabitList;
