import { Routes, Route } from "react-router-dom";
import TopBar from "./components/TopBar";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import LoadingScreen from "./components/LoadingScreen";
import CustomCursor from "./components/CustomCursor";
import LanguageSwitcher from "./components/LanguageSwitcher";
import FloatingContactButton from "./components/buttons/FloatingContactButton";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import FarmerPage from "./pages/FarmerPage";
import FarmerDetailPage from "./pages/FarmerDetailPage";
import CatalogPage from "./pages/CatalogPage";
import EventsPage from "./pages/EventsPage";
import SchoolPage from "./pages/SchoolPage";
import NetworkPage from "./pages/NetworkPage";
import AdminDashboard from "./pages/admin/AdminDashboard";

function App() {
  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ background: "#F5F0E8" }}
    >
      <LoadingScreen onDone={() => {}} />
      <ScrollToTop />
      <TopBar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/farmer" element={<FarmerPage />} />
          <Route path="/farmer/:id" element={<FarmerDetailPage />} />
          <Route path="/catalog" element={<CatalogPage />} />
          <Route path="/events" element={<EventsPage />} />
          <Route path="/school" element={<SchoolPage />} />
          <Route path="/network" element={<NetworkPage />} />
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>
      </main>
      <Footer />
      <LanguageSwitcher />
      <FloatingContactButton />
      <CustomCursor />
    </div>
  );
}

export default App;
