import { motion } from "framer-motion";

interface SectionHeaderProps {
  badge: string;
  title: string;
  description?: string;
}

export const SectionHeader = ({ badge, title, description }: SectionHeaderProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="text-center mb-12 lg:mb-16"
    >
      <span className="inline-block px-4 py-1.5 text-sm font-medium text-primary bg-primary/10 rounded-full border border-primary/20 mb-4">
        {badge}
      </span>
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-display mb-4">
        {title}
      </h2>
      {description && (
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          {description}
        </p>
      )}
    </motion.div>
  );
};
