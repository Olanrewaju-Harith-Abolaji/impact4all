import { useState, useEffect, useRef, useId } from "react";
import { Menu, X } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

/**
 * Primary navigation — max 5 items, mapped to existing routes.
 * All other routes (Skills, Advocacy, Achievements, Contact) remain
 * reachable via CTAs and the footer.
 */
const navLinks = [
  { label: "Work", to: "/projects" },
  { label: "Impact", to: "/initiatives" },
  { label: "Experience", to: "/experience" },
  { label: "Insights", to: "/blog" },
  { label: "About", to: "/about" },
];

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const menuId = useId();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 8);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Escape to close + focus trap + body scroll lock
  useEffect(() => {
    if (!isMobileMenuOpen) return;

    const previouslyFocused = document.activeElement as HTMLElement | null;
    document.body.style.overflow = "hidden";

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsMobileMenuOpen(false);
        return;
      }
      if (e.key === "Tab" && panelRef.current) {
        const focusables = panelRef.current.querySelectorAll<HTMLElement>(
          'a, button, [tabindex]:not([tabindex="-1"])'
        );
        if (!focusables.length) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);

    // Focus first link in the panel
    requestAnimationFrame(() => {
      const first = panelRef.current?.querySelector<HTMLElement>("a, button");
      first?.focus();
    });

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      // Restore focus to menu button
      (previouslyFocused ?? menuButtonRef.current)?.focus?.();
    };
  }, [isMobileMenuOpen]);

  const closeMenu = () => setIsMobileMenuOpen(false);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
          isScrolled
            ? "bg-ivory/85 backdrop-blur-md border-b border-line"
            : "bg-transparent border-b border-transparent"
        }`}
      >
        <nav
          aria-label="Primary"
          className="section-container flex items-center justify-between h-16 lg:h-20"
        >
          <NavLink
            to="/"
            className="font-display text-xl lg:text-2xl font-semibold text-ink tracking-tight"
          >
            Harith<span className="text-teal">.</span>
          </NavLink>

          <ul className="hidden lg:flex items-center gap-9" role="list">
            {navLinks.map((link) => (
              <li key={link.label}>
                <NavLink
                  to={link.to}
                  end={link.to === "/"}
                  className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>

          <div className="hidden lg:block">
            <Button
              onClick={() => navigate("/contact")}
              className="bg-teal hover:bg-teal/90 text-white font-semibold rounded-[10px] h-10 px-5"
            >
              Let's collaborate
            </Button>
          </div>

          <button
            ref={menuButtonRef}
            type="button"
            onClick={() => setIsMobileMenuOpen((v) => !v)}
            className="lg:hidden inline-flex items-center justify-center w-11 h-11 rounded-[10px] text-ink hover:bg-teal-tint transition-colors"
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMobileMenuOpen}
            aria-controls={menuId}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </nav>
      </header>

      {/* Mobile sheet */}
      <div
        id={menuId}
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label="Site menu"
        hidden={!isMobileMenuOpen}
        className="fixed inset-0 z-40 lg:hidden bg-ivory pt-20"
      >
        <div className="section-container py-6">
          <ul className="flex flex-col divide-y divide-line" role="list">
            {navLinks.map((link) => (
              <li key={link.label}>
                <NavLink
                  to={link.to}
                  end={link.to === "/"}
                  onClick={closeMenu}
                  className={({ isActive }) =>
                    `block font-display text-3xl font-medium py-5 min-h-11 ${
                      isActive ? "text-teal" : "text-ink"
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>

          <div className="pt-8">
            <Button
              onClick={() => {
                closeMenu();
                navigate("/contact");
              }}
              size="lg"
              className="w-full bg-teal hover:bg-teal/90 text-white font-semibold rounded-[10px] min-h-12"
            >
              Let's collaborate
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};
