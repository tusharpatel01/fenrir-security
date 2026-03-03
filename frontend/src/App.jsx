import { Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ScanDetail from "./pages/ScanDetail";

export default function App() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  return (
    <div className="min-h-screen bg-white dark:bg-[#121212] text-gray-900 dark:text-gray-200 transition-colors">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/dashboard"
          element={<Dashboard dark={dark} setDark={setDark} />}
        />
        <Route
          path="/scan/:id"
          element={<ScanDetail dark={dark} setDark={setDark} />}
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
}