import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';

interface Habit {
  id: number;
  name: string;
  completed: boolean;
}

interface HabitsState {
  habits: Habit[];
}

const initialState: HabitsState = {
  habits: [],
};


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
  // extraReducers: (builder) => {
  //   builder.addCase(fetchHabits.fulfilled, (state, action) => {
  //     state.habits = action.payload;
  //   });
  // },
});

export const { toggleHabit, addHabit, removeHabit } = habitsSlice.actions;
export default habitsSlice.reducer;
