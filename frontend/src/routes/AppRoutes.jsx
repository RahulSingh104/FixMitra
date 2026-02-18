import { Routes, Route } from "react-router-dom";
import Services from "@/pages/services/Services";
import Login from "@/pages/auth/Login";
import Register from "@/pages/auth/Register";
import VerifyOTP from "@/pages/auth/VerifyOTP";
import ServiceDetail from "@/pages/services/ServiceDetail";
import ProtectedRoute from "./ProtectedRoute";
import MyBookings from "@/pages/dashboard/MyBookings";
import AddService from "@/pages/provider/AddService";
import MyServices from "@/pages/provider/MyServices";
import ProviderBookings from "@/pages/provider/ProviderBookings";
import AdminDashboard from "@/pages/admin/AdminDashboard";
import ManageCategories from "@/pages/admin/ManageCategories";
import ManageUsers from "@/pages/admin/ManageUsers";
import Home from "@/pages/Home";

import PaymentPage from "@/pages/payment/PaymentPage";
import ProviderDashboard from "@/pages/provider/ProviderDashboard";
import NotFound from "@/pages/NotFound"
import Categories from "@/pages/Categories";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/services" element={<Services />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/verify" element={<VerifyOTP />} />
      <Route path="/services/:id" element={<ServiceDetail />} />
      <Route path="/categories" element={<Categories />} />
      <Route path="*" element={<NotFound />} />

      <Route
        path="/bookings"
        element={
          <ProtectedRoute allowedRoles={["USER"]}>
            <MyBookings />
          </ProtectedRoute>
        }
      />

      <Route
        path="/provider/add-service"
        element={
          <ProtectedRoute allowedRoles={["PROVIDER"]}>
            <AddService />
          </ProtectedRoute>
        }
      />

      <Route
        path="/provider/services"
        element={
          <ProtectedRoute allowedRoles={["PROVIDER"]}>
            <MyServices />
          </ProtectedRoute>
        }
      />

      <Route
        path="/provider/bookings"
        element={
          <ProtectedRoute allowedRoles={["PROVIDER"]}>
            <ProviderBookings />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin"
        element={
          <ProtectedRoute allowedRoles={["ADMIN"]}>
            <AdminDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/categories"
        element={
          <ProtectedRoute allowedRoles={["ADMIN"]}>
            <ManageCategories />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/users"
        element={
          <ProtectedRoute allowedRoles={["ADMIN"]}>
            <ManageUsers />
          </ProtectedRoute>
        }
      />
      <Route path="/payment/:bookingId" element={<PaymentPage />} />
      <Route
        path="/provider/dashboard"
        element={
          <ProtectedRoute allowedRoles={["PROVIDER"]}>
            <ProviderDashboard />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}
