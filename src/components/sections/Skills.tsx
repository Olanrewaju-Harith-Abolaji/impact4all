import { motion } from "framer-motion";
import { SectionHeader } from "@/components/ui/SectionHeader";

const skillCategories = [
  {
    title: "Programming",
    icon: "💻",
    skills: [
      { name: "Python", level: 90 },
      { name: "SQL", level: 75 },
      { name: "JavaScript", level: 65 },
      { name: "TypeScript", level: 60 },
    ],
  },
  {
    title: "Data & AI",
    icon: "🤖",
    skills: [
      { name: "Pandas", level: 85 },
      { name: "NumPy", level: 80 },
      { name: "Scikit-Learn", level: 70 },
      { name: "Web Scraping", level: 85 },
    ],
  },
  {
    title: "Web Development",
    icon: "🌐",
    skills: [
      { name: "HTML/CSS", level: 80 },
      { name: "React", level: 60 },
      { name: "Tailwind CSS", level: 70 },
      { name: "REST APIs", level: 75 },
    ],
  },
  {
    title: "Tools & Others",
    icon: "🛠️",
    skills: [
      { name: "Git/GitHub", level: 85 },
      { name: "Power BI", level: 70 },
      { name: "Jupyter", level: 90 },
      { name: "GIS", level: 60 },
    ],
  },
];

export const Skills = () => {
  return (
    <section id="skills" className="py-20 lg:py-32 bg-secondary/20 relative">
      <div className="section-container">
        <SectionHeader
          badge="Skills & Expertise"
          title="My Tech Stack"
          description="Technologies and tools I use to bring ideas to life"
        />

        <div className="grid md:grid-cols-2 gap-6">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: categoryIndex * 0.1 }}
              className="card-glass p-6"
            >
              <div className="flex items-center gap-3 mb-6">
                <span className="text-2xl">{category.icon}</span>
                <h3 className="text-xl font-bold font-display">{category.title}</h3>
              </div>

              <div className="space-y-4">
                {category.skills.map((skill, skillIndex) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: categoryIndex * 0.1 + skillIndex * 0.05 }}
                  >
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium">{skill.name}</span>
                      <span className="text-sm text-muted-foreground">{skill.level}%</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: categoryIndex * 0.1 + skillIndex * 0.05, ease: "easeOut" }}
                        className="h-full bg-gradient-to-r from-primary to-primary/70 rounded-full"
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional skills */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-12 text-center"
        >
          <p className="text-muted-foreground mb-4">Also familiar with:</p>
          <div className="flex flex-wrap justify-center gap-3">
            {["Machine Learning", "Cybersecurity", "Data Visualization", "Agile", "Problem Solving", "Team Leadership"].map(
              (skill, index) => (
                <motion.span
                  key={skill}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 + index * 0.05 }}
                  className="px-4 py-2 bg-secondary border border-border rounded-full text-sm"
                >
                  {skill}
                </motion.span>
              )
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
