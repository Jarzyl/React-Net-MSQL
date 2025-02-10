import React from "react";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import configureStore from "redux-mock-store";
import Navbar from "../src/layout/Navbar";

// Tworzymy mockowy store
const mockStore = configureStore([]);

describe("Navbar", () => {
  it("should render the login button when the user is not logged in", () => {
    const store = mockStore({
      auth: {
        user: null, // Brak użytkownika w stanie
      },
    });

    render(
      <Provider store={store} children={undefined}>
        <Router>
          <Navbar />
        </Router>
      </Provider>
    );

    // Sprawdzamy, czy przycisk logowania jest widoczny
    expect(screen.getByText(/Log In/i)).toBeInTheDocument();
  });

  it("should render the Logout button when the user is logged in", () => {
    const store = mockStore({
      auth: {
        user: { name: "John Doe" }, // Użytkownik jest zalogowany
      },
    });

    render(
      <Provider store={store} children={undefined}>
        <Router>
          <Navbar />
        </Router>
      </Provider>
    );

    // Sprawdzamy, czy przycisk wylogowania jest widoczny
    expect(screen.getByRole("button", { name: /Log Out/i })).toBeInTheDocument();
  });
});
