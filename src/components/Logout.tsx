import React from "react";
import { useDispatch } from "react-redux";
import { logout } from "../redux/authSlice";

const Logout = () => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <button className="w-32 h-10 text-lg font-semibold bg-blue-500" onClick={handleLogout}>
      Log Out
    </button>
  );
};

export default Logout;
