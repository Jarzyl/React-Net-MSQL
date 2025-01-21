import React from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getHabits, deleteHabit } from "../services/habitService.ts";
import { useSelector } from "react-redux";
import HabitCard from "./reusable/HabitCart.tsx";
import { Habit } from "../models/interfaces/habit.ts";

const HabitList: React.FC = () => {
  const userId = useSelector((state: any) => state.auth.userId); // Redux dla auth
  const queryClient = useQueryClient();

  // Pobieranie habitów
  const { data: habits, isLoading, error } = useQuery({
    queryKey: ['habits', userId], // Dodajemy userId do klucza zapytania, żeby miało unikalność
    queryFn: () => getHabits(userId),
    enabled: !!userId, // Włącz zapytanie tylko, jeśli userId jest dostępny
  });

  const handleToggle = (id: number) => {
    // toggleHabitMutation.mutate(id);
  };

   // Mutacja do usuwania habitów
  const mutation = useMutation({
    mutationFn: deleteHabit,
    onSuccess: () => {
      queryClient.invalidateQueries<any[any]>(["habits", userId]); // Odśwież dane po usunięciu
    },
    onError: (error: any) => {
      console.error("Error deleting habit:", error);
    },
  });

  const handleRemove = (id: number) => {
    mutation.mutate(id); // Wywołanie mutacji usuwania nawyku
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading habits</div>;

  return (
    <div className="p-4 mx-auto bg-white max-w-7xl">
      <h2 className="mb-4 text-2xl font-semibold text-center">My Habits</h2>
      <div className="grid grid-cols-2 gap-3">
        {habits.map((habit: Habit) => (
          // <div
          //   key={habit.id}
          //   className={`grid items-center p-4 w-96 h-52 rounded-lg border ${
          //     habit.completed ? "bg-gray-200" : "bg-white shadow-md"
          //   }`}
          // >
          //   <div className="flex justify-between space-x-3">
          //     <span
          //       className={`flex-1 ${
          //         habit.completed ? "line-through text-gray-500" : ""
          //       }`}
          //     >
          //       {habit.name}
          //     </span>
          //     <p className="text-gray-700">{new Date(habit.createdAt).toLocaleString()}</p>
          //   </div>
          //   <div className="space-x-2">
          //     <button
          //       onClick={() => handleToggle(habit.id)}
          //       className="px-3 py-1 text-white bg-green-500 rounded hover:bg-green-600"
          //     >
          //       Toggle
          //     </button>
          //     <button
          //       onClick={() => handleRemove(habit.id)}
          //       className="px-3 py-1 text-white bg-red-500 rounded hover:bg-red-600"
          //     >
          //       Remove
          //     </button>
          //   </div>
          // </div>
          <HabitCard
          key={habit.id}
          habit={habit}
          onToggle={handleToggle}
          onRemove={handleRemove}
        />
        ))}
      </div>
    </div>
  );
};

export default HabitList;
