import { motion } from "framer-motion";
import { ArrowUp } from "lucide-react";

export const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="py-8 border-t border-border bg-card/50">
      <div className="section-container">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-sm text-muted-foreground"
          >
            <p>© {new Date().getFullYear()} Olanrewaju Harith Abolaji</p>
            <p className="mt-1">
              Digital literacy • Youth leadership • Community development • Disability inclusion
            </p>
          </motion.div>

          <motion.button
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            onClick={scrollToTop}
            whileHover={{ y: -2 }}
            aria-label="Return to the top of the page"
            className="self-start md:self-auto inline-flex items-center gap-2 min-h-11 px-2 text-sm text-muted-foreground hover:text-foreground transition-colors rounded-md focus-visible:outline-none"
          >
            Back to top
            <ArrowUp className="w-4 h-4" aria-hidden="true" />
          </motion.button>
        </div>
      </div>
    </footer>
  );
};
