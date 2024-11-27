import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { login, setError } from "../redux/authSlice.ts";
import TextInput from "./reusable/TextInput.tsx";
import { API_URL } from "../config/env.ts";
import { loginUser } from "../services/authService.ts";


interface LoginFormInputs {
  email: string;
  password: string;
}

export default function LoginForm() {
  const dispatch = useDispatch();
  const error = useSelector((state: any) => state.auth.error); // Odczytujemy błąd z Redux
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>();

  // const onSubmit: SubmitHandler<LoginFormInputs> = async ({ email, password }) => {
  //   try {
  //     const response = await fetch(`${API_URL}/account/login`, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({ email, password }),
  //     });

  //     if (!response.ok) {
  //       const errorData = await response.json();
  //       dispatch(setError(errorData.message || "Błąd logowania."));
  //       return;
  //     }

  //     const data = await response.json();
  //     dispatch(login({ token: data.token }));
  //     window.location.href = "/dashboard";
  //   } catch (err) {
  //     dispatch(setError("Wystąpił błąd. Spróbuj ponownie."));
  //     console.error(err);
  //   }
  // };

  const onSubmit: SubmitHandler<LoginFormInputs> = async ({ email, password }) => {
    const data = await loginUser(email, password, dispatch);
    if (data) {
      window.location.href = "/dashboard";
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
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Email field */}
          <TextInput
            label="Email address"
            name="email"
            type="email"
            register={register}
            validation={{
              required: "Email jest wymagany.",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Podaj poprawny adres email.",
              },
            }}
            errors={errors}
          />

          {/* Password field */}
          <TextInput
            label="Password"
            name="password"
            type="password"
            register={register}
            validation={{
              required: "Hasło jest wymagane.",
              minLength: {
                value: 5,
                message: "Hasło musi mieć co najmniej 5 znaków.",
              },
            }}
            errors={errors}
          />

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
