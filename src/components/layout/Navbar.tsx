import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";

const navLinks = [
  { label: "Home", to: "/" },
  { label: "Initiatives", to: "/initiatives" },
  { label: "Experience", to: "/experience" },
  { label: "About", to: "/about" },
  { label: "Advocacy", to: "/advocacy" },
  { label: "Skills", to: "/skills" },
  { label: "Projects", to: "/projects" },
  { label: "Achievements", to: "/achievements" },
  { label: "Blog", to: "/blog" },
  { label: "Contact", to: "/contact" },
];

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const toggleRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const firstMenuItemRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menu on route change and restore focus to toggle
  useEffect(() => {
    if (isMobileMenuOpen) {
      setIsMobileMenuOpen(false);
      toggleRef.current?.focus();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  // Focus trap + Escape + focus first item when menu opens; restore focus on close
  useEffect(() => {
    if (!isMobileMenuOpen) return;
    const previouslyFocused = document.activeElement as HTMLElement | null;
    // Focus first menu item shortly after mount
    const t = window.setTimeout(() => firstMenuItemRef.current?.focus(), 30);

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        setIsMobileMenuOpen(false);
        toggleRef.current?.focus();
        return;
      }
      if (e.key !== "Tab" || !menuRef.current) return;
      const focusable = menuRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.clearTimeout(t);
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
      previouslyFocused?.focus?.();
    };
  }, [isMobileMenuOpen]);

  const closeMenu = () => setIsMobileMenuOpen(false);

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        aria-label="Primary"
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-white/70 backdrop-blur-xl border-b border-white/60 shadow-sm"
            : "bg-transparent"
        }`}
      >
        <div className="section-container">
          <div className="flex items-center justify-between h-16 lg:h-20">
            <NavLink
              to="/"
              className="text-xl lg:text-2xl font-bold text-gradient rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2"
              aria-label="Harith — Home"
            >
              Harith.
            </NavLink>

            <div className="hidden lg:flex items-center gap-7">
              {navLinks.map((link) => (
                <NavLink
                  key={link.label}
                  to={link.to}
                  end={link.to === "/"}
                  className={({ isActive }) =>
                    `nav-link text-sm font-medium rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 ${
                      isActive ? "active" : ""
                    }`
                  }
                  
                >
                  {link.label}
                </NavLink>
              ))}
              <Button
                onClick={() => navigate("/contact")}
                className="bg-primary hover:bg-primary/90 text-primary-foreground font-medium rounded-full"
              >
                Hire Me
              </Button>
            </div>

            <button
              ref={toggleRef}
              onClick={() => setIsMobileMenuOpen((v) => !v)}
              className="lg:hidden p-2 text-foreground rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2"
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" aria-hidden="true" /> : <Menu className="w-6 h-6" aria-hidden="true" />}
            </button>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            ref={menuRef}
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 lg:hidden bg-white/95 backdrop-blur-xl pt-20"
          >
            <div className="section-container py-8">
              <nav aria-label="Mobile primary" className="flex flex-col gap-2">
                {navLinks.map((link, index) => (
                  <motion.div
                    key={link.label}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.04 }}
                  >
                    <NavLink
                      ref={index === 0 ? firstMenuItemRef : undefined}
                      to={link.to}
                      end={link.to === "/"}
                      onClick={closeMenu}
                      className={({ isActive }) =>
                        `block text-left text-2xl font-semibold py-3 border-b border-border rounded-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 ${
                          isActive ? "text-foreground" : "hover:text-foreground"
                        }`
                      }
                    >
                      {link.label}
                    </NavLink>
                  </motion.div>
                ))}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: navLinks.length * 0.04 }}
                  className="pt-4"
                >
                  <Button
                    onClick={() => {
                      closeMenu();
                      navigate("/contact");
                    }}
                    size="lg"
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-full"
                  >
                    Hire Me
                  </Button>
                </motion.div>
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
