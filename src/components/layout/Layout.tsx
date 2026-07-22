import { Outlet, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { FloatingBookMe } from "@/components/ui/FloatingBookMe";

export const Layout = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, [location.pathname]);

  return (
    <div className="min-h-screen relative bg-ivory">
      <a href="#main-content" className="skip-link">Skip to content</a>
      <Navbar />
      <AnimatePresence mode="wait">
        <motion.main
          id="main-content"
          key={location.pathname}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.28, ease: "easeOut" }}
          className="relative z-10"
        >
          <Outlet />
        </motion.main>
      </AnimatePresence>
      <Footer />
      <FloatingBookMe />
    </div>
  );
};
