import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Typ dla pojedynczego nawyku
interface Habit {
  id: number;
  name: string;
  completed: boolean;
}

// Typ dla stanu nawyków
interface HabitsState {
  habits: Habit[];
}

// Stan początkowy
const initialState: HabitsState = {
  habits: [
    { id: 1, name: 'Picie wody', completed: false },
    { id: 2, name: 'Ćwiczenia', completed: false },
    { id: 3, name: 'Nauka języka', completed: false },
  ],
};

// Tworzenie slice'a
const habitsSlice = createSlice({
  name: 'habits',
  initialState,
  reducers: {
    toggleHabit: (state, action: PayloadAction<number>) => {
      const habit = state.habits.find(h => h.id === action.payload);
      if (habit) {
        habit.completed = !habit.completed;
      }
    },
    addHabit: (state, action: PayloadAction<string>) => {
      const newHabit: Habit = {
        id: state.habits.length + 1,
        name: action.payload,
        completed: false,
      };
      state.habits.push(newHabit);
    },
    removeHabit: (state, action: PayloadAction<number>) => {
      state.habits = state.habits.filter(habit => habit.id !== action.payload);
    },
  },
});

export const { toggleHabit, addHabit, removeHabit } = habitsSlice.actions;
export default habitsSlice.reducer;
