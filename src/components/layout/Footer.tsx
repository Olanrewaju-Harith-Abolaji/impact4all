import { motion } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { Link } from "react-router-dom";

export const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="py-10 border-t border-border bg-card/50">
      <div className="section-container">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-sm text-muted-foreground"
          >
            <p>© 2026 Olanrewaju Harith Abolaji</p>
            <p className="mt-1">
              Digital literacy • Youth leadership • Community development • Disability inclusion
            </p>
          </motion.div>

          <nav aria-label="Footer" className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm">
            <Link to="/about" className="text-muted-foreground hover:text-foreground transition-colors">
              About
            </Link>
            <Link to="/projects" className="text-muted-foreground hover:text-foreground transition-colors">
              Selected work
            </Link>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Visit my LinkedIn profile"
            >
              LinkedIn
            </a>
            <a
              href="mailto:harith@example.com"
              className="text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Send me an email"
            >
              Email
            </a>
            <motion.button
              onClick={scrollToTop}
              whileHover={{ y: -2 }}
              aria-label="Return to the top of the page"
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              Back to top
              <ArrowUp className="w-4 h-4" aria-hidden="true" />
            </motion.button>
          </nav>
        </div>
      </div>
    </footer>
  );
};
