import React from "react";
import { useDispatch } from "react-redux";
import { logout } from "../redux/authSlice.ts";

const Logout = () => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout()); // Wywołanie akcji logout
  };

  return <button className="h-10 bg-red-500 w-30" onClick={handleLogout}>Wyloguj się</button>;
};

export default Logout;
