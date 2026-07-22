import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../redux/authSlice";
import toast from 'react-hot-toast';

const Logout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    toast.success('Logged out successfully');
    navigate('/');
  };

  return (
    <button className="w-32 h-10 text-lg font-semibold bg-blue-500" onClick={handleLogout}>
      Log Out
    </button>
  );
};

export default Logout;
