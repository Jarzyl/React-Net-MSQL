import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom"; // Importujemy MemoryRouter
import HeroSection from "../src/components/HeroSection"; // Ścieżka do komponentu

describe("HeroSection", () => {
  it("renders the hero section correctly", () => {
    render(
      <MemoryRouter>  {/* Używamy MemoryRouter zamiast BrowserRouter */}
        <HeroSection />
      </MemoryRouter>
    );

    // Sprawdzamy, czy tytuł jest renderowany
    expect(screen.getByText(/Data to enrich your online business/i)).toBeInTheDocument();

    // Sprawdzamy, czy przycisk 'Get started' jest renderowany
    expect(screen.getByText(/Get started/i)).toBeInTheDocument();

    // Sprawdzamy, czy link 'Learn more' jest renderowany
    expect(screen.getByText(/Learn more/i)).toBeInTheDocument();
  });

  it("renders the announcement text", () => {
    render(
      <MemoryRouter>  {/* Używamy MemoryRouter */}
        <HeroSection />
      </MemoryRouter>
    );

    // Sprawdzamy, czy tekst ogłoszenia jest renderowany
    expect(screen.getByText(/Announcing our next round of funding/i)).toBeInTheDocument();
  });
});
