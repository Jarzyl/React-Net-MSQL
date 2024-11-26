import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Logout from "./Logout.tsx"; // Importujemy komponent Logout

export default function Navbar() {
  const user = useSelector((state: any) => state.auth.user); // Pobieramy stan użytkownika z Redux

  return (
    <header className="absolute inset-x-0 top-0 z-50">
      <nav className="flex items-center justify-between p-6 lg:px-8" aria-label="Global">
        <div className="flex lg:flex-1">
          <a href="/" className="-m-1.5 p-1.5">
            <span className="sr-only">Your Company</span>
            <img
              className="w-auto h-8"
              src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600"
              alt=""
            />
          </a>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="size-6"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          </button>
        </div>
        <div className="hidden lg:flex lg:gap-x-12">
          <a href="/habits" className="text-sm font-semibold text-gray-900 lg:text-xl">
            Nawyki
          </a>
          <a href="/dashboard" className="text-sm font-semibold text-gray-900 lg:text-xl">
            Dashboard
          </a>
          <a href="#" className="text-sm font-semibold text-gray-900 lg:text-xl">
            Marketplace
          </a>
          <a href="#" className="text-sm font-semibold text-gray-900 lg:text-xl">
            Company
          </a>
        </div>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          {user ? (
            // Jeśli użytkownik jest zalogowany, wyświetlamy komponent Logout
            <Logout />
          ) : (
            // Jeśli użytkownik nie jest zalogowany, wyświetlamy link do logowania
            <Link to="/login" className="text-sm font-semibold text-gray-900">
              Log in <span aria-hidden="true">&rarr;</span>
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
}
