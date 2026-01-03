import { motion } from "framer-motion";
import { Award, ExternalLink } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";

const certifications = [
  {
    title: "AI & Robotics Internship Certificate",
    issuer: "National Centre for AI & Robotics",
    year: "2024",
    icon: "🤖",
  },
  {
    title: "Millennium Fellowship",
    issuer: "United Nations Academic Impact",
    year: "2024",
    icon: "🌍",
  },
  {
    title: "Python for Data Science",
    issuer: "IBM / Coursera",
    year: "2023",
    icon: "🐍",
  },
  {
    title: "Data Analysis with Python",
    issuer: "freeCodeCamp",
    year: "2023",
    icon: "📊",
  },
  {
    title: "Machine Learning Fundamentals",
    issuer: "Stanford Online",
    year: "2023",
    icon: "🧠",
  },
  {
    title: "Cybersecurity Essentials",
    issuer: "Cisco",
    year: "2022",
    icon: "🔐",
  },
];

const achievements = [
  "Dean's List - University of Ilorin",
  "Top 1% in National Programming Contest",
  "Best Innovation Award - Tech Hackathon",
  "Community Leadership Recognition",
];

export const Certifications = () => {
  return (
    <section id="certifications" className="py-20 lg:py-32 relative">
      <div className="section-container">
        <SectionHeader
          badge="Credentials"
          title="Certifications & Achievements"
          description="Recognized qualifications and accomplishments in my journey"
        />

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Certifications grid */}
          <div className="lg:col-span-2">
            <div className="grid sm:grid-cols-2 gap-4">
              {certifications.map((cert, index) => (
                <motion.div
                  key={cert.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ y: -4 }}
                  className="card-glass p-5 group cursor-default"
                >
                  <div className="flex items-start gap-4">
                    <span className="text-3xl shrink-0">{cert.icon}</span>
                    <div className="min-w-0">
                      <h4 className="font-semibold text-sm mb-1 group-hover:text-primary transition-colors line-clamp-2">
                        {cert.title}
                      </h4>
                      <p className="text-xs text-muted-foreground mb-1">
                        {cert.issuer}
                      </p>
                      <span className="text-xs text-primary font-medium">
                        {cert.year}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Achievements sidebar */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="card-glass p-6 h-fit"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-primary/10 border border-primary/20 rounded-xl flex items-center justify-center">
                <Award className="w-5 h-5 text-primary" />
              </div>
              <h3 className="text-lg font-bold font-display">Achievements</h3>
            </div>

            <ul className="space-y-3">
              {achievements.map((achievement, index) => (
                <motion.li
                  key={achievement}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start gap-3 text-sm"
                >
                  <span className="text-primary mt-0.5">▹</span>
                  <span className="text-muted-foreground">{achievement}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
