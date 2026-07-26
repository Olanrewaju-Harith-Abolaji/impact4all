import { motion } from "framer-motion";
import { Users, Accessibility, HandHeart, BookOpen } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";

const advocacyAreas = [
  {
    icon: Accessibility,
    title: "Disability inclusion",
    description:
      "Advocating for the meaningful participation of persons with disabilities in education, technology, employment, leadership and community programmes.",
    color: "from-pink-500 to-rose-500",
  },
  {
    icon: BookOpen,
    title: "Digital literacy",
    description:
      "Supporting practical, accessible digital learning for young people and underserved communities so they can participate more confidently in a digital society.",
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: Users,
    title: "Youth leadership",
    description:
      "Supporting young people to build confidence, develop leadership skills and take part meaningfully in decisions that affect their communities.",
    color: "from-amber-500 to-orange-500",
  },
  {
    icon: HandHeart,
    title: "Community development",
    description:
      "Supporting locally relevant initiatives that respond to community needs and connect people with useful knowledge and opportunities.",
    color: "from-green-500 to-emerald-500",
  },
];

export const Advocacy = () => {
  return (
    <section id="advocacy" className="py-20 lg:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />

      <div className="section-container relative">
        <SectionHeader
          badge="Advocacy"
          title="Leadership and advocacy"
          description="A short summary of the ideas that guide my work."
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center mb-16"
        >
          <blockquote className="text-2xl lg:text-3xl font-display font-bold text-foreground italic">
            &ldquo;Access is a leadership responsibility, not an act of charity.&rdquo;
          </blockquote>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {advocacyAreas.map((area, index) => (
            <motion.div
              key={area.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -4 }}
              className="card-glass p-6 group"
            >
              <div className="flex items-start gap-4">
                <div
                  className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${area.color} flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform`}
                >
                  <area.icon className="w-7 h-7 text-white" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="text-xl font-bold font-display mb-2 group-hover:text-primary transition-colors">
                    {area.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {area.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
