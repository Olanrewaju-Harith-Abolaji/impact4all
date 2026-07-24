import { Outlet, useLocation, useNavigationType } from "react-router-dom";
import { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { FloatingBookMe } from "@/components/ui/FloatingBookMe";

/**
 * Focus-restoration model:
 * - On PUSH/REPLACE (forward navigation): remember the element that had focus
 *   just before the route change, then move focus to <main> so keyboard users
 *   land on page content.
 * - On POP (browser Back/Forward): restore focus to the element that triggered
 *   the original navigation, if it is still in the DOM. Otherwise, focus main.
 */
export const Layout = () => {
  const location = useLocation();
  const navType = useNavigationType();
  const mainRef = useRef<HTMLElement>(null);
  // Stack of previously-focused triggering elements, keyed by pathname sequence
  const triggerStack = useRef<HTMLElement[]>([]);
  const prevPathRef = useRef<string>(location.pathname);
  // Element that had focus at the moment of the pending navigation
  const pendingTriggerRef = useRef<HTMLElement | null>(null);

  // Capture the active element BEFORE React commits a new route.
  // We use a document-level click listener so any link/button click updates it.
  useEffect(() => {
    const capture = () => {
      const el = document.activeElement as HTMLElement | null;
      if (el && el !== document.body) pendingTriggerRef.current = el;
    };
    document.addEventListener("click", capture, true);
    document.addEventListener("keydown", capture, true);
    return () => {
      document.removeEventListener("click", capture, true);
      document.removeEventListener("keydown", capture, true);
    };
  }, []);

  useEffect(() => {
    // Only run on actual path changes, not initial mount
    const changed = prevPathRef.current !== location.pathname;
    prevPathRef.current = location.pathname;

    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });

    if (!changed) return;

    if (navType === "POP") {
      // Try to restore focus to the trigger of the previous forward nav
      const trigger = triggerStack.current.pop();
      if (trigger && document.body.contains(trigger)) {
        trigger.focus();
        return;
      }
    } else {
      // PUSH / REPLACE: remember the triggering element for later restoration
      if (pendingTriggerRef.current && document.body.contains(pendingTriggerRef.current)) {
        triggerStack.current.push(pendingTriggerRef.current);
      }
    }
    // Fallback: focus the main region so screen readers announce the new page
    mainRef.current?.focus();
  }, [location.pathname, navType]);

  return (
    <div className="min-h-screen relative">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:px-4 focus:py-2 focus:rounded-md focus:bg-black focus:text-white focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 focus:ring-offset-white"
      >
        Skip to main content
      </a>
      <Navbar />
      <AnimatePresence mode="wait">
        <motion.main
          ref={mainRef}
          key={location.pathname}
          id="main-content"
          tabIndex={-1}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="relative z-10 focus:outline-none"
        >
          <Outlet />
        </motion.main>
      </AnimatePresence>
      <Footer />
      <FloatingBookMe />
    </div>
  );
};
