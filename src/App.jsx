import { useState, useEffect } from "react";
import { injectGlobalStyles } from "./styles/globals";

// Import components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import SakuraPetals from "./components/SakuraPetals";

// Import pages
import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import Portfolio from "./pages/Portfolio";
import Contact from "./pages/Contact";
import Help from "./pages/Help";

// Inject global styles on app startup
injectGlobalStyles();


// Page mapping
const PAGE_COMPONENTS = {
  Home,
  About,
  Services,
  Portfolio,
  Help,
  Contact
};
/**
 * Main App Component
 * Routes between pages based on activePage state
 */
export default function App() {
  const [activePage, setActivePage] = useState("Home");

  const handleNavigation = (page) => {
    setActivePage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const PageComponent = PAGE_COMPONENTS[activePage];

  return (
    <div className="min-h-screen bg-[#FFF8FA]">
      <SakuraPetals />
      <Navbar activePage={activePage} setActivePage={handleNavigation} />
      <main>
        <PageComponent setActivePage={handleNavigation} />
      </main>
      <Footer setActivePage={handleNavigation} />
    </div>
  );
}
