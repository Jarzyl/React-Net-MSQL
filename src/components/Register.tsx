import React, { useState } from "react";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [userName, setUserName] = useState("");  // Dodanie stanu dla imienia
  const [lastName, setLastName] = useState("");    // Dodanie stanu dla nazwiska
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  // Obsługuje zmiany w polach formularza
  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);
  const handleConfirmPasswordChange = (e) => setConfirmPassword(e.target.value);
  const handleFirstNameChange = (e) => setUserName(e.target.value);  // Funkcja dla imienia
  const handleLastNameChange = (e) => setLastName(e.target.value);    // Funkcja dla nazwiska

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
    //   setError("Hasła muszą być takie same.");
      return;
    }

    if (!email || !password || !confirmPassword || !userName || !lastName) {
    //   setError("Wszystkie pola są wymagane.");
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/api/account/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
          userName: userName,    // Przekazanie imienia
          lastName: lastName,      // Przekazanie nazwiska
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.message || "Błąd rejestracji.");
        return;
      }

      const data = await response.json();
    //   setSuccessMessage("Rejestracja zakończona sukcesem! Możesz się teraz zalogować.");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setUserName("");      // Resetowanie imienia
      setLastName("");       // Resetowanie nazwiska
      setError(null);
    } catch (err) {
    //   setError("Wystąpił błąd. Spróbuj ponownie.");
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
        <h2 className="mt-10 text-2xl font-bold tracking-tight text-center text-gray-900">
          Create your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* First Name field */}
          <div>
            <label
              htmlFor="firstName"
              className="block text-sm font-medium text-gray-900"
            >
              First Name
            </label>
            <div className="mt-2">
              <input
                id="firstName"
                name="firstName"
                type="text"
                value={userName}
                onChange={handleFirstNameChange}
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
              />
            </div>
          </div>

          {/* Last Name field */}
          <div>
            <label
              htmlFor="lastName"
              className="block text-sm font-medium text-gray-900"
            >
              Last Name
            </label>
            <div className="mt-2">
              <input
                id="lastName"
                name="lastName"
                type="text"
                value={lastName}
                onChange={handleLastNameChange}
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
              />
            </div>
          </div>

          {/* Email field */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-900"
            >
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
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
              />
            </div>
          </div>

          {/* Password field */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-900"
            >
              Password
            </label>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                value={password}
                onChange={handlePasswordChange}
                autoComplete="new-password"
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
              />
            </div>
          </div>

          {/* Confirm Password field */}
          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-gray-900"
            >
              Confirm Password
            </label>
            <div className="mt-2">
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
                autoComplete="new-password"
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
              />
            </div>
          </div>

          {/* Error and Success messages */}
          {error && <div className="text-sm text-red-500">{error}</div>}
          {successMessage && (
            <div className="text-sm text-green-500">{successMessage}</div>
          )}

          {/* Submit button */}
          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Register
            </button>
          </div>
        </form>

        <p className="mt-10 text-sm text-center text-gray-500">
          Already have an account?
          <a
            href="/login"
            className="font-semibold text-indigo-600 hover:text-indigo-500"
          >
            Sign in
          </a>
        </p>
      </div>
    </div>
  );
}
