import React from "react";
import AddHabitForm from "./AddHabitForm.tsx";
import HabitList from "./HabitsList.tsx";

function HabitPage() {
  return (
    <div className="pt-36 justify-center mx-auto grid max-w-[1500px] w-full">
      <h1>Śledzenie Nawyki</h1>
      <AddHabitForm />
      <HabitList />
    </div>
  );
}

export default HabitPage;
