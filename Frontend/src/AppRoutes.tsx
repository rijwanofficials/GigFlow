import { Routes, Route } from "react-router-dom";
import AppLayout from "./layout/AppLayout";
import Home from "./Pages/Homes";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import ProtectedRoute from "./components/ProtectedRoutes";
import Profile from "./Pages/Profile";
import PageNotFound from "./Pages/PageNotFound";
import PostGig from "./Pages/CreateGig";
import ViewBids from "./Pages/ViewBids";

function AppRoutes() {
  return (
    <Routes>
      {/* Layout wrapper */}
      <Route element={<AppLayout />}>
        {/* Public routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Protected routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/profile" element={<Profile />} />
          <Route path="/post-gig" element={<PostGig />} />
          <Route path="/gigs/:gigId/bids" element={<ViewBids />} />
        </Route>

        {/* 🔴 404 fallback */}
        <Route path="*" element={<PageNotFound />} />
      </Route>
    </Routes>
  );
}

export default AppRoutes;
