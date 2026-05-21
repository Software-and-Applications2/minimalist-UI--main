import { Routes, Route, Navigate } from "react-router-dom";
import { AdminLayout, VisitorLayout } from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./pages/Home";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import "./App.css";

export default function App() {
  return (
    <Routes>
      {/* Public visitor routes */}
      <Route element={<VisitorLayout />}>
        <Route path="/" element={<Home />} />
      </Route>

      {/* Admin login (public) */}
      <Route path="/admin/login" element={<AdminLogin />} />

      {/* Protected admin routes */}
      <Route path="/admin" element={<ProtectedRoute />}>
        <Route element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="files" element={<AdminDashboard />} />
          <Route path="settings" element={<AdminDashboard />} />
        </Route>
      </Route>

      {/* 404 catch-all */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
