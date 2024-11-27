import "./styles/App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HeroSection from "./components/HeroSection.tsx";
import Layout from "./layout/layout.tsx";
import HabitPage from "./pages/habits/HabitPage.tsx";
import LoginPage from "./pages/login/LoginPage.tsx";
import RegisterPage from "./pages/register/RegisterPage.tsx";
import DashboardPage from "./pages/dashboard/DashboardPage.tsx";

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<HeroSection />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/habits" element={<HabitPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
