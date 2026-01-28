import { Routes, Route } from "react-router-dom";

import HomeLayout from "./layout/HomeLayout";
import AppLayout from "./layout/AppLayout";

import Home from "./Pages/Homes";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import ProtectedRoute from "./components/ProtectedRoutes";
import Profile from "./Pages/Profile";
import PageNotFound from "./Pages/PageNotFound";
import PostGig from "./Pages/CreateGig";
import ViewBids from "./Pages/ViewBids";
import PlaceBid from "./Pages/PlaceBid";

function AppRoutes() {
  return (
    <Routes>
      <Route element={<HomeLayout />}>
        <Route path="/" element={<Home />} />
      </Route>
      <Route element={<AppLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/profile" element={<Profile />} />
          <Route path="/post-gig" element={<PostGig />} />
          <Route path="/gigs/:gigId/bids" element={<ViewBids />} />
          <Route path="/gigs/:gigId/place-bid" element={<PlaceBid />} />
        </Route>
      </Route>

      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
}

export default AppRoutes;
