import React from "react";
import { useForm } from "react-hook-form";
import { registerUser } from "../services/authService.ts";
import TextInput from "./reusable/TextInput.tsx";

interface RegisterFormData {
  userName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export default function RegisterForm() {
  const {
    register,
    handleSubmit,
    watch,
    setError,
    clearErrors,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>();

  const onSubmit = async (data: RegisterFormData) => {
    const { password, confirmPassword, ...userData } = data;

    if (password !== confirmPassword) {
      setError("confirmPassword", {
        type: "manual",
        message: "Hasła muszą być takie same.",
      });
      return;
    }

    try {
      await registerUser({ ...userData, password });
      // Tutaj można dodać logikę np. przekierowania po sukcesie
    } catch (error) {
      setError("email", {
        type: "manual",
        message: "Rejestracja nie powiodła się.",
      });
    }
  };

  return (
    <div className="flex flex-col justify-center min-h-full px-6 py-12 lg:px-8 pt-36">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-2xl font-bold tracking-tight text-center text-gray-900">
          Create your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* First Name */}
          <TextInput
            label="First Name"
            name="userName"
            type="text"
            register={register}
            validation={{
              required: "Imię jest wymagane",
            }}
            errors={errors}
          />

          {/* Last Name */}
          <TextInput
            label="Last Name"
            name="lastName"
            type="text"
            register={register}
            validation={{
              required: "Nazwisko jest wymagane",
            }}
            errors={errors}
          />

          {/* Email */}
          <TextInput
            label="Email"
            name="email"
            type="email"
            register={register}
            validation={{
              required: "Email jest wymagany",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Nieprawidłowy format adresu e-mail",
              },
            }}
            errors={errors}
          />

          {/* Password */}
          <TextInput
            label="Password"
            name="password"
            type="password"
            register={register}
            validation={{
              required: "Hasło jest wymagane",
              minLength: {
                value: 5,
                message: "Hasło musi mieć co najmniej 5 znaków",
              },
            }}
            errors={errors}
          />

          {/* Confirm Password */}
          <TextInput
            label="Confirm Password"
            name="confirmPassword"
            type="password"
            register={register}
            validation={{
              required: "Potwierdzenie hasła jest wymagane",
            }}
            errors={errors}
          />

          {/* Submit button */}
          <div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              {isSubmitting ? "Registering..." : "Register"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
