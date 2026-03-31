import { useState, useEffect, useCallback } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import Layout from "./components/Layout";
import LandingPage from "./pages/LandingPage";
import Dashboard from "./pages/Dashboard";
import AdminDashboard from "./pages/AdminDashboard";
import Onboarding from "./pages/Onboarding";
import SignIn from "./pages/SignIn";
import AlphaDetail from "./pages/AlphaDetail";
import FeatureDetail from "./pages/FeatureDetail";
import SkillsMarketplace, { PostGig, BecomeSeller, SellerProfile } from "./pages/SkillsMarketplace";
import NewsHighlights, { NewsDetail } from "./pages/NewsHighlights";
import AlphaCorner from "./pages/AlphaCorner";
import EarningOpportunities, { PostOpportunity, OpportunityDetail } from "./pages/EarningOpportunities";
import Activities, { CreateBlog, BlogDetail } from "./pages/Activities";
import TrainingProgram from "./pages/TrainingProgram";
import Events, { SubmitEvent, EventDetail } from "./pages/Events";
import Sponsorship from "./pages/Sponsorship";
import LoadingScreen from "./components/LoadingScreen";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [showGrid, setShowGrid] = useState(false);

  // Handle loading complete
  const handleLoadingComplete = useCallback(() => {
    setIsLoading(false);
    // Refresh ScrollTrigger after loading
    ScrollTrigger.refresh();
  }, []);

  // Toggle grid overlay
  const toggleGrid = useCallback(() => {
    setShowGrid((prev) => !prev);
  }, []);

  // Toggle theme (placeholder for future theme switching)
  const toggleTheme = useCallback(() => {
    // Theme toggle functionality can be added here
    console.log("Theme toggle clicked");
  }, []);

  // Initialize smooth scroll and other effects
  useEffect(() => {
    if (isLoading) return;

    // Refresh ScrollTrigger on window resize
    const handleResize = () => {
      ScrollTrigger.refresh();
    };

    window.addEventListener("resize", handleResize);

    // Setup parallax effects for sections
    const sections = document.querySelectorAll("section");
    sections.forEach((section) => {
      const elements = section.querySelectorAll(".parallax");
      elements.forEach((el) => {
        gsap.to(el, {
          yPercent: -20,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      });
    });

    return () => {
      window.removeEventListener("resize", handleResize);
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, [isLoading]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Cmd/Ctrl + G for grid toggle
      if ((e.metaKey || e.ctrlKey) && e.key === "g") {
        e.preventDefault();
        toggleGrid();
      }
      // Cmd/Ctrl + C for theme toggle
      if ((e.metaKey || e.ctrlKey) && e.key === "c") {
        e.preventDefault();
        toggleTheme();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [toggleGrid, toggleTheme]);

  return (
    <div className="relative min-h-screen bg-brand-bg text-brand-text">
      {/* Loading Screen */}
      {isLoading && <LoadingScreen onComplete={handleLoadingComplete} />}

      {/* Grid Overlay */}
      {showGrid && (
        <div className="fixed inset-0 z-30 grid-overlay active pointer-events-none" />
      )}

      {/* Main Content */}
      <main
        className={`transition-opacity duration-500 ${
          isLoading ? "opacity-0" : "opacity-100"
        }`}
      >
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<LandingPage />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="admin" element={<AdminDashboard />} />
              <Route path="onboarding" element={<Onboarding />} />
              <Route path="signin" element={<SignIn />} />
              <Route path="feature/:id" element={<FeatureDetail />} />
              <Route path="skill-marketplace" element={<SkillsMarketplace />} />
              <Route path="skill-marketplace/new-gig" element={<PostGig />} />
              <Route path="skill-marketplace/become-seller" element={<BecomeSeller />} />
              <Route path="skill-marketplace/profile/:id" element={<SellerProfile />} />
              <Route path="news-highlights" element={<NewsHighlights />} />
              <Route path="news-highlights/:id" element={<NewsDetail />} />
              <Route path="alpha-corner" element={<AlphaCorner />} />
              <Route path="alpha-corner/:id" element={<AlphaDetail />} />
              <Route path="earning-opportunities" element={<EarningOpportunities />} />
              <Route path="earning-opportunities/new" element={<PostOpportunity />} />
              <Route path="earning-opportunities/:id" element={<OpportunityDetail />} />
              <Route path="activities" element={<Activities />} />
              <Route path="activities/new" element={<CreateBlog />} />
              <Route path="activities/:id" element={<BlogDetail />} />
              <Route path="training-program" element={<TrainingProgram />} />
              <Route path="events" element={<Events />} />
              <Route path="events/new" element={<SubmitEvent />} />
              <Route path="events/:id" element={<EventDetail />} />
              <Route path="sponsorship-partnership" element={<Sponsorship />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </main>

      {/* Custom Cursor */}
      <CustomCursor />
    </div>
  );
}

// Custom Cursor Component
function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    // Check if touch device
    const checkTouch = window.matchMedia("(pointer: coarse)").matches;
    setIsTouchDevice(checkTouch);
    if (checkTouch) return;

    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.closest("a") ||
        target.closest("button") ||
        target.classList.contains("cursor-pointer")
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseover", handleMouseOver);
    };
  }, []);

  if (isTouchDevice) return null;

  return (
    <>
      {/* Main cursor dot */}
      <div
        className="custom-cursor fixed w-3 h-3 bg-brand-accent rounded-full pointer-events-none z-[9999] mix-blend-difference transition-transform duration-100"
        style={{
          left: position.x - 6,
          top: position.y - 6,
          transform: isHovering ? "scale(2)" : "scale(1)",
        }}
      />
      {/* Trailing cursor */}
      <div
        className="custom-cursor fixed w-8 h-8 border border-brand-accent/50 rounded-full pointer-events-none z-[9998] transition-all duration-200"
        style={{
          left: position.x - 16,
          top: position.y - 16,
          transform: isHovering ? "scale(1.5)" : "scale(1)",
          opacity: isHovering ? 0.8 : 0.4,
        }}
      />
    </>
  );
}
