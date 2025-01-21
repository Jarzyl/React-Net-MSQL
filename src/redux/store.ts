import { configureStore } from "@reduxjs/toolkit";
import habitsReducer from "./habitsSlice";
import authReducer from "./authSlice";
import { thunk } from "redux-thunk";

const store = configureStore({
  reducer: {
    // habits: habitsReducer,
    auth: authReducer,
  },
  // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});

export default store;
