import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { login, setError } from "../redux/authSlice.ts";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  
  const error = useSelector((state: any) => state.auth.error); // Odczytujemy błąd z Redux

  // Obsługuje zmiany w polach formularza
  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  // Obsługuje wysyłanie formularza
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Sprawdzenie czy email i hasło zostały wprowadzone
    if (!email || !password) {
      return;
    }

    // Wysyłanie zapytania do backendu (zakładając, że backend jest dostępny pod /api/login)
    try {
      const response = await fetch(`http://localhost:5000/api/account/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        dispatch(setError(errorData.message || "Błąd logowania.")); // Zapisujemy błąd do Redux
        return;
      }

      // Jeśli logowanie się uda, wykonaj odpowiednie czynności, np. przekierowanie
      const data = await response.json();
      console.log("Zalogowano pomyślnie:", data);
      // Przechowaj token lub inne dane użytkownika, np. w LocalStorage
      dispatch(login({ token: data.token })); // Wywołanie akcji login
      // Możesz również przekierować na inną stronę
      window.location.href = "/dashboard";

    } catch (err) {
      dispatch(setError("Wystąpił błąd. Spróbuj ponownie.")); // Zapisujemy błąd do Redux
      console.error(err);
    }
  };

  return (
    <div className="flex flex-col justify-center min-h-full px-6 py-12 lg:px-8 pt-36">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          className="w-auto h-10 mx-auto"
          src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600"
          alt="Your Company"
        />
        <h2 className="mt-10 font-bold tracking-tight text-center text-gray-900 text-2xl/9">
          Sign in to your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email field */}
          <div>
            <label htmlFor="email" className="block font-medium text-gray-900 text-sm/6">
              Email address
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                value={email}
                onChange={handleEmailChange}
                autoComplete="email"
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
              />
            </div>
          </div>

          {/* Password field */}
          <div>
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="block font-medium text-gray-900 text-sm/6">
                Password
              </label>
              <div className="text-sm">
                <a
                  href="#"
                  className="font-semibold text-indigo-600 hover:text-indigo-500"
                >
                  Forgot password?
                </a>
              </div>
            </div>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                value={password}
                onChange={handlePasswordChange}
                autoComplete="current-password"
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
              />
            </div>
          </div>

          {/* Error message */}
          {error && (
            <div className="text-sm text-red-500">{error}</div>
          )}

          {/* Submit button */}
          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Sign in
            </button>
          </div>
        </form>

        <p className="mt-10 text-center text-gray-500 text-sm/6">
          Not a member?
          <Link
            to="/register"
            className="font-semibold text-indigo-600 hover:text-indigo-500"
          >
            Create account
          </Link>
        </p>
      </div>
    </div>
  );
}
