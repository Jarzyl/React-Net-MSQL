import { configureStore } from "@reduxjs/toolkit";
import habitsReducer from "./habitsSlice.ts";
import authReducer from "./authSlice.ts";

const store = configureStore({
  reducer: {
    habits: habitsReducer,
    auth: authReducer,
  },
});

export default store;
