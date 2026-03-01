import { motion } from "framer-motion";
import { Award } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";

const achievements = [
  {
    title: "Aspire Institute Fellow",
    issuer: "",
    year: "2026",
    icon: "🎓",
  },
  {
    title: "Millennium Fellow",
    issuer: "United Nations Academic Impact",
    year: "2025",
    icon: "🌍",
  },
  {
    title: "Data Science",
    issuer: "National Information Technology Development Agency",
    year: "2024",
    icon: "📊",
  },
];

export const Certifications = () => {
  return (
    <section id="certifications" className="py-20 lg:py-32 relative">
      <div className="section-container">
        <SectionHeader
          badge="Credentials"
          title="Achievements"
          description="Recognized qualifications and accomplishments in my journey"
        />

        <div className="max-w-3xl mx-auto">
          <div className="space-y-4">
            {achievements.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ y: -4 }}
                className="card-glass p-5 group cursor-default"
              >
                <div className="flex items-start gap-4">
                  <span className="text-3xl shrink-0">{item.icon}</span>
                  <div className="min-w-0 flex-1">
                    <h4 className="font-semibold text-lg mb-1 group-hover:text-primary transition-colors">
                      {item.title}
                    </h4>
                    {item.issuer && (
                      <p className="text-sm text-muted-foreground mb-1">
                        {item.issuer}
                      </p>
                    )}
                    <span className="text-sm text-primary font-medium">
                      {item.year}
                    </span>
                  </div>
                  <div className="w-10 h-10 bg-primary/10 border border-primary/20 rounded-xl flex items-center justify-center shrink-0">
                    <Award className="w-5 h-5 text-primary" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
