import { motion } from "framer-motion";
import { Quote, Star } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";

const testimonials = [
  {
    quote:
      "Harith's passion for technology and inclusion is truly inspiring. His work ethic and dedication to making a difference sets him apart.",
    author: "Mentor at NCAR",
    role: "AI & Robotics Program",
    avatar: "🎓",
  },
  {
    quote:
      "An exceptional leader who combines technical excellence with a genuine commitment to community development and accessibility.",
    author: "Fellow Millennium Fellow",
    role: "UN Academic Impact",
    avatar: "🌍",
  },
  {
    quote:
      "Harith brings creativity and determination to every project. His advocacy for disability inclusion has opened many eyes in our community.",
    author: "Community Partner",
    role: "Tech For Good Initiative",
    avatar: "💡",
  },
];

export const Testimonials = () => {
  return (
    <section className="py-20 lg:py-32 bg-secondary/20 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
      
      <div className="section-container relative">
        <SectionHeader
          badge="Testimonials"
          title="What People Say"
          description="Feedback from mentors, colleagues, and community partners"
        />

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.author}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              whileHover={{ y: -4 }}
              className="card-glass p-6 relative group"
            >
              {/* Quote icon */}
              <div className="absolute -top-3 -left-3 w-10 h-10 bg-primary/10 border border-primary/20 rounded-xl flex items-center justify-center">
                <Quote className="w-5 h-5 text-primary" />
              </div>

              {/* Stars */}
              <div className="flex gap-1 mb-4 pt-2">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 fill-primary text-primary"
                  />
                ))}
              </div>

              <p className="text-muted-foreground leading-relaxed mb-6 italic">
                "{testimonial.quote}"
              </p>

              <div className="flex items-center gap-3 pt-4 border-t border-border">
                <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center text-2xl">
                  {testimonial.avatar}
                </div>
                <div>
                  <div className="font-semibold text-foreground">
                    {testimonial.author}
                  </div>
                  <div className="text-sm text-primary">
                    {testimonial.role}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
