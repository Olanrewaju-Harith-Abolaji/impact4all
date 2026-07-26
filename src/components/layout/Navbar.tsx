import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";

const navLinks = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Focus Areas", to: "/skills" },
  { label: "Initiatives", to: "/initiatives" },
  { label: "Experience", to: "/experience" },
  { label: "Work", to: "/projects" },
  { label: "Recognition", to: "/achievements" },
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
    const handleScroll = () => setIsScrolled(window.scrollY > 12);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      setIsMobileMenuOpen(false);
      toggleRef.current?.focus();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  useEffect(() => {
    if (!isMobileMenuOpen) return;
    const previouslyFocused = document.activeElement as HTMLElement | null;
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
      <nav
        aria-label="Primary"
        className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-200 ${
          isScrolled
            ? "bg-[color:var(--brand-background)]/95 backdrop-blur border-b border-border"
            : "bg-[color:var(--brand-background)]/80 backdrop-blur-sm border-b border-transparent"
        }`}
      >
        <div className="section-container">
          <div className="flex items-center justify-between h-16 lg:h-20">
            <NavLink
              to="/"
              className="text-lg lg:text-xl font-semibold tracking-tight text-foreground rounded-md focus-visible:outline-none"
              aria-label="Olanrewaju Harith Abolaji — Home"
            >
              Olanrewaju Harith A.
            </NavLink>

            <div className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <NavLink
                  key={link.label}
                  to={link.to}
                  end={link.to === "/"}
                  className={({ isActive }) =>
                    `nav-link text-[15px] font-medium py-2 rounded-sm focus-visible:outline-none ${
                      isActive ? "active" : ""
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              ))}
              <Button
                onClick={() => navigate("/contact")}
                className="bg-primary hover:bg-[hsl(var(--primary-hover))] text-primary-foreground font-medium rounded-[var(--radius-button)] min-h-11 px-5"
              >
                Work with me
              </Button>
            </div>

            <button
              ref={toggleRef}
              onClick={() => setIsMobileMenuOpen((v) => !v)}
              className="lg:hidden inline-flex items-center justify-center min-h-11 min-w-11 text-foreground rounded-md focus-visible:outline-none"
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" aria-hidden="true" />
              ) : (
                <Menu className="w-6 h-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            ref={menuRef}
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 z-40 lg:hidden bg-[color:var(--brand-background)] pt-20 overflow-y-auto"
          >
            <div className="section-container py-6">
              <nav aria-label="Mobile primary" className="flex flex-col">
                {navLinks.map((link, index) => (
                  <NavLink
                    key={link.label}
                    ref={index === 0 ? firstMenuItemRef : undefined}
                    to={link.to}
                    end={link.to === "/"}
                    onClick={closeMenu}
                    className={({ isActive }) =>
                      `block text-left text-xl font-medium py-4 border-b border-border rounded-sm focus-visible:outline-none min-h-11 ${
                        isActive ? "text-foreground" : "text-muted-foreground"
                      }`
                    }
                  >
                    {link.label}
                  </NavLink>
                ))}
                <div className="pt-6">
                  <Button
                    onClick={() => {
                      closeMenu();
                      navigate("/contact");
                    }}
                    size="lg"
                    className="w-full bg-primary hover:bg-[hsl(var(--primary-hover))] text-primary-foreground font-medium rounded-[var(--radius-button)] min-h-12"
                  >
                    Work with me
                  </Button>
                </div>
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
