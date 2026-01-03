import { motion } from "framer-motion";
import { ArrowRight, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionHeader } from "@/components/ui/SectionHeader";

const posts = [
  {
    title: "Getting Started with Machine Learning in Python",
    excerpt:
      "A beginner-friendly guide to understanding machine learning concepts and implementing your first model using Scikit-Learn.",
    category: "AI & ML",
    date: "Coming Soon",
    emoji: "🧠",
  },
  {
    title: "Why Cybersecurity Education Matters for Everyone",
    excerpt:
      "Exploring the importance of cybersecurity awareness and how gamification can make learning security practices more engaging.",
    category: "Cybersecurity",
    date: "Coming Soon",
    emoji: "🛡️",
  },
  {
    title: "From Code to Impact: Tech for Social Good",
    excerpt:
      "How young technologists can leverage their skills to create meaningful change in their communities and beyond.",
    category: "Tech & Society",
    date: "Coming Soon",
    emoji: "🌍",
  },
];

export const Blog = () => {
  return (
    <section id="blog" className="py-20 lg:py-32 bg-secondary/20 relative">
      <div className="section-container">
        <SectionHeader
          badge="Insights"
          title="Blog & Thoughts"
          description="Sharing knowledge on AI, cybersecurity, and technology for impact"
        />

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {posts.map((post, index) => (
            <motion.article
              key={post.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -4 }}
              className="card-glass p-6 group cursor-pointer"
            >
              <div className="flex items-center gap-2 mb-4">
                <span className="text-2xl">{post.emoji}</span>
                <span className="px-2 py-0.5 text-xs font-medium bg-primary/10 text-primary rounded-full">
                  {post.category}
                </span>
              </div>

              <h3 className="font-bold font-display text-lg mb-3 group-hover:text-primary transition-colors line-clamp-2">
                {post.title}
              </h3>

              <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                {post.excerpt}
              </p>

              <div className="flex items-center justify-between pt-4 border-t border-border">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Calendar className="w-3 h-3" />
                  {post.date}
                </div>
                <ArrowRight className="w-4 h-4 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </motion.article>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <p className="text-muted-foreground mb-4">
            More articles coming soon. Stay tuned!
          </p>
          <Button variant="outline" disabled className="opacity-50">
            Subscribe to Newsletter
          </Button>
        </motion.div>
      </div>
    </section>
  );
};
