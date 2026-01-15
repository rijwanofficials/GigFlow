import { Outlet } from "react-router-dom";
import Navbar from "../components/LandingNavbar";
import Footer from "../components/Footer";

function AppLayout() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      {/* Page Content */}
      <main className="grow">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}

export default AppLayout;
