import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";

export const FloatingBookMe = () => {
  return (
    <motion.a
      href="https://wa.me/YOUR_NUMBER"
      target="_blank"
      rel="noopener noreferrer"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1.5, type: "spring", stiffness: 200 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-5 py-3 bg-primary text-primary-foreground font-semibold rounded-full shadow-lg hover:bg-primary/90 transition-colors glow-effect"
      aria-label="Book Me on WhatsApp"
    >
      <MessageCircle className="w-5 h-5" />
      <span className="hidden sm:inline">Book Me</span>
    </motion.a>
  );
};
