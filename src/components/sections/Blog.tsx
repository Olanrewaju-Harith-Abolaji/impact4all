import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { SectionHeader } from "@/components/ui/SectionHeader";

export const Blog = () => {
  return (
    <section id="blog" className="py-20 lg:py-32 bg-secondary/20 relative">
      <div className="section-container">
        <SectionHeader
          badge="Insights"
          title="Blog & Thoughts"
          description="Sharing Knowledge on Leadership, Volunteering, Community Development, and Disability Inclusion"
        />

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <p className="text-muted-foreground mb-4">
            Articles coming soon. Stay tuned!
          </p>
          <Button variant="outline" disabled className="opacity-50">
            Subscribe to Newsletter
          </Button>
        </motion.div>
      </div>
    </section>
  );
};
