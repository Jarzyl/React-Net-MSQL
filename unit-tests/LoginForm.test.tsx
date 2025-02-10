import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { BrowserRouter } from "react-router-dom";
import LoginForm from "../src/components/LoginForm";


// Mock Redux store
const mockStore = configureStore([]);
const store = mockStore({
  auth: { error: null }, // Domyślny stan
});

describe("LoginForm", () => {
  it("renderuje formularz logowania", () => {
    render(
      <Provider store={store} children={undefined}>
        <BrowserRouter>
          <LoginForm />
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByText(/Sign in to your account/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Sign in/i })).toBeInTheDocument();
  });

  it("wyświetla błąd, gdy pola są puste", async () => {
    render(
      <Provider store={store} children={undefined}>
        <BrowserRouter>
          <LoginForm />
        </BrowserRouter>
      </Provider>
    );

    fireEvent.click(screen.getByRole("button", { name: /Sign in/i }));

    await waitFor(() => {
      expect(screen.getByText(/Email jest wymagany/i)).toBeInTheDocument();
      expect(screen.getByText(/Hasło jest wymagane/i)).toBeInTheDocument();
    });
  });

  it("wyświetla błąd dla niepoprawnego emaila", async () => {
    render(
      <Provider store={store} children={undefined}>
        <BrowserRouter>
          <LoginForm />
        </BrowserRouter>
      </Provider>
    );

    fireEvent.change(screen.getByLabelText(/Email address/i), {
      target: { value: "invalid-email" },
    });
    fireEvent.change(screen.getByLabelText(/Password/i), {
      target: { value: "password123" },
    });

    fireEvent.click(screen.getByRole("button", { name: /Sign in/i }));

    await waitFor(() => {
      expect(screen.getByText(/Podaj poprawny adres email/i)).toBeInTheDocument();
    });
  });

  it("przekazuje poprawne dane do funkcji onSubmit", async () => {
    const loginUserMock = jest.fn();
    jest.mock("../services/authService", () => ({
      loginUser: loginUserMock,
    }));

    render(
      <Provider store={store} children={undefined}>
        <BrowserRouter>
          <LoginForm />
        </BrowserRouter>
      </Provider>
    );

    fireEvent.change(screen.getByLabelText(/Email address/i), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/Password/i), {
      target: { value: "password123" },
    });

    fireEvent.click(screen.getByRole("button", { name: /Sign in/i }));

    await waitFor(() => {
      expect(loginUserMock).toHaveBeenCalledWith(
        "test@example.com",
        "password123",
        expect.any(Function) // Dispatch z Redux
      );
    });
  });
});
