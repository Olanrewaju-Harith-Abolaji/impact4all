import { motion } from "framer-motion";
import { SectionHeader } from "@/components/ui/SectionHeader";

const experiences = [
  {
    period: "2024 - Present",
    title: "AI & Robotics Intern",
    company: "National Centre for AI & Robotics",
    description:
      "Working on cutting-edge AI projects and learning from industry experts in artificial intelligence and robotics development.",
    type: "internship",
  },
  {
    period: "2023 - 2024",
    title: "Millennium Fellow",
    company: "Millennium Fellowship Program",
    description:
      "Selected among top youth leaders globally. Led initiatives focused on sustainable development goals and community impact.",
    type: "fellowship",
  },
  {
    period: "2022 - Present",
    title: "Founder & Lead Developer",
    company: "Kekecruise",
    description:
      "Founded and developed a bicycle rental management system, managing operations and building technical solutions for sustainable transportation.",
    type: "entrepreneurship",
  },
  {
    period: "2021 - Present",
    title: "IT Student",
    company: "University of Ilorin",
    description:
      "Pursuing B.Tech in Information Technology with focus on Data Science, AI, and Cybersecurity. Maintaining strong academic performance while contributing to tech communities.",
    type: "education",
  },
];

const typeStyles = {
  internship: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  fellowship: "bg-amber-500/10 text-amber-400 border-amber-500/20",
  entrepreneurship: "bg-green-500/10 text-green-400 border-green-500/20",
  education: "bg-purple-500/10 text-purple-400 border-purple-500/20",
};

export const Experience = () => {
  return (
    <section id="experience" className="py-20 lg:py-32 bg-secondary/20 relative">
      <div className="section-container">
        <SectionHeader
          badge="Journey"
          title="Experience & Leadership"
          description="My path in technology, leadership, and social impact"
        />

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-border md:-translate-x-px" />

          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <motion.div
                key={exp.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`relative flex flex-col md:flex-row gap-8 ${
                  index % 2 === 0 ? "md:flex-row-reverse" : ""
                }`}
              >
                {/* Timeline dot */}
                <div className="absolute left-0 md:left-1/2 w-4 h-4 bg-primary rounded-full border-4 border-background md:-translate-x-1/2 z-10" />

                {/* Content */}
                <div className="flex-1 pl-8 md:pl-0">
                  <div
                    className={`card-glass p-6 ${
                      index % 2 === 0 ? "md:mr-12" : "md:ml-12"
                    }`}
                  >
                    <div className="flex flex-wrap items-center gap-3 mb-3">
                      <span className="text-sm text-muted-foreground font-mono">
                        {exp.period}
                      </span>
                      <span
                        className={`px-2 py-0.5 text-xs font-medium rounded-full border capitalize ${
                          typeStyles[exp.type as keyof typeof typeStyles]
                        }`}
                      >
                        {exp.type}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold font-display mb-1">
                      {exp.title}
                    </h3>
                    <p className="text-primary font-medium mb-3">{exp.company}</p>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {exp.description}
                    </p>
                  </div>
                </div>

                {/* Spacer for alternating layout */}
                <div className="hidden md:block flex-1" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
