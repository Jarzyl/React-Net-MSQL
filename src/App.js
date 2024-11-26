import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HeroSection from './components/HeroSection.tsx';
import Login from './components/Login.tsx';
import Layout from './Layout/layout.tsx';
import HabitPage from './components/HabitPage.tsx';
import Register from './components/Register.tsx';
import Dashboard from './components/Dashboard.tsx';

function App() {
  return (
    <Router>
      <Layout>
      <Routes>
        <Route path="/" element={<HeroSection />} />
        <Route path="/login" element={<Login />} />
        <Route path="/habits" element={<HabitPage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
        </Layout>
    </Router>
  );
}

export default App;
