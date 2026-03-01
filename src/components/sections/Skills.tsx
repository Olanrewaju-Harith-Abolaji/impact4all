import { motion } from "framer-motion";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Database, Users, Wrench, ShieldCheck, Cloud, Lock, BarChart3, FileText } from "lucide-react";

const skillCategories = [
  {
    title: "Data Science & Management",
    icon: Database,
    skills: ["Python", "Machine Learning", "Data Analysis", "Data Visualization (Matplotlib/Seaborn)"],
    span: "md:col-span-2",
  },
  {
    title: "Project & Community Management",
    icon: Users,
    skills: ["Agile/Scrum", "Stakeholder Engagement", "Community Building", "Youth Leadership Development"],
    span: "md:col-span-1",
  },
  {
    title: "Productivity Tools",
    icon: Wrench,
    skills: ["Jupyter Notebooks", "Git/GitHub", "Slack", "Discord", "Microsoft Office Suite"],
    span: "md:col-span-1",
  },
  {
    title: "Data Governance & Quality",
    icon: ShieldCheck,
    skills: ["Data Profiling", "Data Cleaning (Pandas)", "Data Integrity", "Data Security"],
    span: "md:col-span-1",
  },
  {
    title: "Cloud Storage",
    icon: Cloud,
    skills: ["Google Cloud Storage", "Scalable Data Management"],
    span: "md:col-span-1",
  },
  {
    title: "Data Privacy Compliance",
    icon: Lock,
    skills: ["Data Protection Regulations", "NDPR (Nigeria)", "Ethical Data Handling"],
    span: "md:col-span-1",
  },
  {
    title: "Stakeholder Reporting",
    icon: BarChart3,
    skills: ["Complex Data → Business Insights", "Non-Technical Communication", "Visual Reporting"],
    span: "md:col-span-1",
  },
  {
    title: "Documentation",
    icon: FileText,
    skills: ["Data Dictionaries", "Metadata Management", "Team-Wide Data Literacy"],
    span: "md:col-span-2",
  },
];

export const Skills = () => {
  return (
    <section id="skills" className="py-20 lg:py-32 bg-secondary/20 relative">
      <div className="section-container">
        <SectionHeader
          badge="Skills & Expertise"
          title="Skills & Tools"
          description="Technical proficiency and management capabilities I bring to every project"
        />

        {/* Management & Strategy label */}
        <div className="grid md:grid-cols-2 gap-5 mb-10">
          {skillCategories.slice(0, 5).map((category, i) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07 }}
              className={`card-glass p-6 ${category.span}`}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2.5 rounded-xl bg-primary/10 text-primary">
                  <category.icon className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold font-display">{category.title}</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1.5 bg-secondary border border-border rounded-full text-sm text-foreground"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Management & Strategy Skills */}
        <motion.h3
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-xl font-bold font-display text-center mb-6 text-gradient"
        >
          Management & Strategy Skills
        </motion.h3>

        <div className="grid md:grid-cols-2 gap-5">
          {skillCategories.slice(5).map((category, i) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07 }}
              className={`card-glass p-6 ${category.span}`}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2.5 rounded-xl bg-primary/10 text-primary">
                  <category.icon className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold font-display">{category.title}</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1.5 bg-secondary border border-border rounded-full text-sm text-foreground"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
