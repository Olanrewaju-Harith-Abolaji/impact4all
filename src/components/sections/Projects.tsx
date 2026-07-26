import { motion } from "framer-motion";
import { ExternalLink, Github, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionHeader } from "@/components/ui/SectionHeader";

const projects = [
  {
    title: "Salary Prediction Model",
    description:
      "Machine learning model to predict salaries based on experience, education, and skills. Includes data preprocessing and visualization.",
    tech: ["Python", "Scikit-Learn", "Pandas"],
    github: "https://github.com",
    featured: true,
    emoji: "💰",
  },
  {
    title: "Company Profit Prediction",
    description:
      "Predictive analytics solution for forecasting company profits using regression analysis and historical data.",
    tech: ["Python", "NumPy", "Data Analysis"],
    github: "https://github.com",
    featured: true,
    emoji: "📈",
  },
  {
    title: "Web Scraping & Analysis",
    description:
      "Automated data collection and analysis pipeline for gathering insights from web sources.",
    tech: ["Python", "BeautifulSoup", "Pandas"],
    github: "https://github.com",
    emoji: "🔍",
  },
  {
    title: "Kekecruise",
    description:
      "Bicycle rental management system designed to streamline operations and enhance user experience.",
    tech: ["Python", "Database", "Management"],
    github: "https://github.com",
    emoji: "🚲",
  },
];

export const Projects = () => {
  const featuredProjects = projects.filter((p) => p.featured);
  const otherProjects = projects.filter((p) => !p.featured);

  return (
    <section id="projects" className="py-20 lg:py-32 relative">
      <div className="section-container">
        <SectionHeader
          badge="Featured Work"
          title="Projects I've Built"
          description="A collection of projects showcasing my skills in data science, AI, and software development"
        />

        {/* Featured projects */}
        <div className="space-y-8 mb-16">
          {featuredProjects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group"
            >
              <div className="card-glass p-6 lg:p-8 hover:border-primary/30 transition-all duration-300">
                <div className="flex flex-col lg:flex-row gap-6 items-start">
                  <div className="w-16 h-16 bg-primary/10 border border-primary/20 rounded-2xl flex items-center justify-center text-3xl shrink-0 group-hover:scale-110 transition-transform">
                    {project.emoji}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-4 mb-3">
                      <h3 className="text-xl lg:text-2xl font-bold font-display group-hover:text-primary transition-colors">
                        {project.title}
                      </h3>
                      <div className="flex gap-2 shrink-0">
                        <motion.a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                          className="p-2 bg-secondary hover:bg-muted rounded-lg transition-colors"
                        >
                          <Github className="w-5 h-5" />
                        </motion.a>
                      </div>
                    </div>
                    <p className="text-muted-foreground mb-4 leading-relaxed">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {project.tech.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 text-xs font-medium text-primary bg-primary/10 rounded-full"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Other projects grid */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-8"
        >
          <h3 className="text-xl font-semibold font-display mb-6">Other Projects</h3>
          <div className="grid sm:grid-cols-2 gap-4">
            {otherProjects.map((project, index) => (
              <motion.a
                key={project.title}
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -4 }}
                className="card-glass p-5 group cursor-pointer hover:border-primary/30 transition-all"
              >
                <div className="flex items-start justify-between mb-3">
                  <span className="text-2xl">{project.emoji}</span>
                  <ArrowUpRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
                <h4 className="font-semibold mb-2 group-hover:text-primary transition-colors">
                  {project.title}
                </h4>
                <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech) => (
                    <span key={tech} className="text-xs text-muted-foreground">
                      {tech}
                    </span>
                  ))}
                </div>
              </motion.a>
            ))}
          </div>
        </motion.div>

        {/* View more button */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Button variant="outline" size="lg" className="group">
            View All Projects on GitHub
            <ExternalLink className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
};
