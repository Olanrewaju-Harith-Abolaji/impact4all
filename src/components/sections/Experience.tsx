import { motion } from "framer-motion";
import { SectionHeader } from "@/components/ui/SectionHeader";

const experiences = [
  {
    period: "2025 – Present",
    title: "Co-founder",
    company: "AccessEd Africa, formerly TechNexus",
    description:
      "Helping lead a digital literacy initiative supporting young people in underserved Nigerian communities. Contribute to programme design, participant coordination and documentation of outcomes.",
    type: "leadership",
  },
  {
    period: "2024 – 2025",
    title: "Departmental Stakeholder Chairman",
    company: "University of Ilorin",
    description:
      "Represented more than 4,000 students in departmental engagements. Coordinated communication with faculty and student representatives and helped follow through on documented concerns.",
    type: "leadership",
  },
  {
    period: "2024 – 2025",
    title: "Millennium Fellowship Campus Director",
    company: "United Nations Academic Impact & Millennium Campus Network",
    description:
      "Participated in the Millennium Fellowship and progressed to Campus Director. Supported peer fellows, coordinated campus-level activities and contributed to fellowship reporting.",
    type: "fellowship",
  },
  {
    period: "2024",
    title: "Disability inclusion advocacy",
    company: "Community engagements",
    description:
      "Contributed to conversations, writing and programme involvement focused on the meaningful participation of persons with disabilities in education, technology and community life.",
    type: "advocacy",
  },
  {
    period: "2024",
    title: "AI and Robotics Intern",
    company: "National Centre for Artificial Intelligence and Robotics",
    description:
      "Completed an internship exposure to artificial intelligence and robotics projects. Strengthened understanding of data workflows and technical documentation that now supports programme reporting.",
    type: "internship",
  },
  {
    title: "Co-founder",
    company: "Kekecruise",
    description:
      "Co-founded a bicycle rental management project. Contributed to operational planning and the technical setup supporting day-to-day activities.",
    type: "entrepreneurship",
  },
  {
    period: "2021 – August 2025",
    title: "B.Sc. Information and Communication Science",
    company: "University of Ilorin",
    description:
      "Completed a degree in Information and Communication Science with Second Class Upper Honours. Studies strengthened my understanding of information systems, digital technologies and how access to information shapes participation and opportunity.",
    type: "education",
  },
];

const typeStyles = {
  internship: "bg-blue-500/10 text-blue-500 border-blue-500/20",
  fellowship: "bg-amber-500/10 text-amber-600 border-amber-500/20",
  entrepreneurship: "bg-green-500/10 text-green-600 border-green-500/20",
  education: "bg-purple-500/10 text-purple-600 border-purple-500/20",
  advocacy: "bg-pink-500/10 text-pink-600 border-pink-500/20",
  leadership: "bg-cyan-500/10 text-cyan-700 border-cyan-500/20",
};

export const Experience = () => {
  return (
    <section id="experience" className="py-20 lg:py-32 bg-secondary/20 relative">
      <div className="section-container">
        <SectionHeader
          badge="Experience"
          title="Roles, responsibilities and learning"
          description="Leadership, advocacy, programme and academic roles that shape my current work."
        />

        <div className="relative">
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-border md:-translate-x-px" />

          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <motion.div
                key={exp.title + exp.company}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`relative flex flex-col md:flex-row gap-8 ${
                  index % 2 === 0 ? "md:flex-row-reverse" : ""
                }`}
              >
                <div className="absolute left-0 md:left-1/2 w-4 h-4 bg-primary rounded-full border-4 border-background md:-translate-x-1/2 z-10" />

                <div className="flex-1 pl-8 md:pl-0">
                  <div
                    className={`card-glass p-6 ${
                      index % 2 === 0 ? "md:mr-12" : "md:ml-12"
                    }`}
                  >
                    <div className="flex flex-wrap items-center gap-3 mb-3">
                      {exp.period && (
                        <span className="text-sm text-muted-foreground font-mono">
                          {exp.period}
                        </span>
                      )}
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

                <div className="hidden md:block flex-1" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
