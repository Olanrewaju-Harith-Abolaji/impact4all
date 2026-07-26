import { motion } from "framer-motion";
import { ExternalLink, Github, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionHeader } from "@/components/ui/SectionHeader";

const additionalTechnical = [
  {
    title: "Salary prediction model",
    description:
      "Regression model estimating salary based on experience, education and skills. Used for practising data preparation, feature handling and simple evaluation.",
    tech: ["Python", "Scikit-Learn", "Pandas"],
    github: "https://github.com",
    emoji: "💰",
  },
  {
    title: "Company profit prediction",
    description:
      "Regression exercise forecasting company profit from historical inputs. Focused on data preparation, model fitting and interpretation.",
    tech: ["Python", "NumPy", "Data Analysis"],
    github: "https://github.com",
    emoji: "📈",
  },
  {
    title: "Web scraping and analysis",
    description:
      "Practice project collecting data from web sources and preparing it for analysis and reporting.",
    tech: ["Python", "BeautifulSoup", "Pandas"],
    github: "https://github.com",
    emoji: "🔍",
  },
  {
    title: "Kekecruise",
    description:
      "Bicycle rental management project co-founded to support day-to-day operations and record-keeping.",
    tech: ["Python", "Operations", "Documentation"],
    github: "https://github.com",
    emoji: "🚲",
  },
];

export const Projects = () => {
  return (
    <section id="projects" className="py-20 lg:py-32 relative">
      <div className="section-container">
        <SectionHeader
          badge="Selected work"
          title="Selected work"
          description="These projects show how I approach digital literacy, youth leadership, disability inclusion and community development through practical programmes, advocacy and coordination."
        />

        {/* Principal case study */}
        <div className="mb-16">
          <motion.article
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="card-glass p-8 lg:p-10 border border-border rounded-3xl"
            aria-labelledby="case-accessed"
          >
            <div className="flex items-center gap-3 mb-4">
              <span className="text-3xl" aria-hidden="true">🌍</span>
              <div>
                <p className="text-xs uppercase tracking-widest text-muted-foreground font-semibold">
                  Case study
                </p>
                <h3 id="case-accessed" className="text-2xl lg:text-3xl font-bold font-display">
                  AccessEd Africa
                </h3>
                <p className="text-sm text-muted-foreground">Formerly TechNexus</p>
              </div>
            </div>

            <dl className="grid md:grid-cols-2 gap-6 text-sm">
              <div>
                <dt className="font-semibold text-foreground mb-1">Context</dt>
                <dd className="text-muted-foreground">
                  Many young people in underserved communities have limited
                  access to structured digital learning.
                </dd>
              </div>
              <div>
                <dt className="font-semibold text-foreground mb-1">My role</dt>
                <dd className="text-muted-foreground">Co-founder</dd>
              </div>
              <div className="md:col-span-2">
                <dt className="font-semibold text-foreground mb-1">Approach</dt>
                <dd className="text-muted-foreground">
                  Designed and supported digital learning activities around
                  participant realities, including infrastructure limitations,
                  uneven access to devices and limited previous exposure.
                </dd>
              </div>
              <div className="md:col-span-2">
                <dt className="font-semibold text-foreground mb-1">Verified result</dt>
                <dd className="text-muted-foreground">
                  More than 2,500 young people reached, with a 90% programme
                  completion rate verified through attendance records, programme
                  documentation and completion of assigned participant tasks.
                </dd>
              </div>
              <div className="md:col-span-2">
                <dt className="font-semibold text-foreground mb-1">Lesson</dt>
                <dd className="text-muted-foreground">
                  Programme quality should be assessed not only by enrolment but
                  also by whether participants remain engaged and complete the
                  learning process.
                </dd>
              </div>
            </dl>
          </motion.article>
        </div>

        {/* Additional technical work */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-8"
        >
          <h3 className="text-xl font-semibold font-display mb-2">Additional technical work</h3>
          <p className="text-sm text-muted-foreground mb-6 max-w-2xl">
            Smaller technical projects completed while studying Information and Communication Science.
            They support, rather than define, my primary work.
          </p>
          <div className="grid sm:grid-cols-2 gap-4">
            {additionalTechnical.map((project, index) => (
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
                aria-label={`View ${project.title} on GitHub`}
                className="card-glass p-5 group cursor-pointer hover:border-primary/30 transition-all"
              >
                <div className="flex items-start justify-between mb-3">
                  <span className="text-2xl" aria-hidden="true">{project.emoji}</span>
                  <ArrowUpRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" aria-hidden="true" />
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

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Button asChild variant="outline" size="lg" className="group">
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" aria-label="View more work on GitHub">
              View more on GitHub
              <ExternalLink className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
            </a>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};
