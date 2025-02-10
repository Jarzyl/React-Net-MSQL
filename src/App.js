import "./styles/App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HeroSection from "./components/HeroSection";
import Layout from "./layout/layout";
import HabitPage from "./pages/habits/HabitPage";
import LoginPage from "./pages/login/LoginPage";
import RegisterPage from "./pages/register/RegisterPage";
import DashboardPage from "./pages/dashboard/DashboardPage";
import ForumPage from "./pages/forum/ForumPage";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<HeroSection />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/habits" element={<HabitPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/forum" element={<ForumPage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
