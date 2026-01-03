import { motion } from "framer-motion";
import { GraduationCap, Briefcase, Award, Users } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";

const highlights = [
  {
    icon: GraduationCap,
    title: "IT Student",
    description: "Final-year at University of Ilorin with focus on AI & Data Science",
  },
  {
    icon: Briefcase,
    title: "AI Intern",
    description: "National Centre for AI & Robotics internship experience",
  },
  {
    icon: Award,
    title: "Millennium Fellow",
    description: "Recognized for leadership in sustainable development",
  },
  {
    icon: Users,
    title: "Entrepreneur",
    description: "Founder of Kekecruise - Bicycle Rental Management System",
  },
];

export const About = () => {
  return (
    <section id="about" className="py-20 lg:py-32 relative">
      <div className="section-container">
        <SectionHeader
          badge="About Me"
          title="Crafting Technology for Impact"
          description="A passionate technologist bridging the gap between innovation and social good"
        />

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Story */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <p className="text-lg text-muted-foreground leading-relaxed">
              I'm <span className="text-foreground font-semibold">Olanrewaju Harith Abolaji</span>, 
              a final-year Information Technology student at the University of Ilorin with a 
              deep passion for building intelligent systems that solve real-world problems.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              My journey into tech started with Python, and has since evolved into exploring 
              Data Science, Machine Learning, and Cybersecurity. I believe technology should 
              serve humanity, which drives my work in creating impactful solutions.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Beyond code, I'm passionate about leadership and community development. As a 
              Millennium Fellow and founder of Kekecruise, I've learned that sustainable 
              impact comes from combining technical skills with a vision for positive change.
            </p>

            {/* Quick stats */}
            <div className="flex flex-wrap gap-6 pt-4">
              {[
                { value: "5+", label: "Projects" },
                { value: "3+", label: "Years Coding" },
                { value: "10+", label: "Certifications" },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="text-3xl font-bold text-gradient">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Highlight cards */}
          <div className="grid sm:grid-cols-2 gap-4">
            {highlights.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -4, scale: 1.02 }}
                className="card-glass p-6 group cursor-default"
              >
                <div className="w-12 h-12 bg-primary/10 border border-primary/20 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <item.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold font-display text-lg mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
