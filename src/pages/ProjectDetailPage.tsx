import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Github, ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getProjectBySlug, projects } from "@/data/projects";
import NotFound from "./NotFound";

const ProjectDetailPage = () => {
  const { slug } = useParams();
  const project = slug ? getProjectBySlug(slug) : undefined;

  if (!project) return <NotFound />;

  const related = projects.filter((p) => p.slug !== project.slug).slice(0, 3);

  return (
    <div className="page-wrap">
      <article className="py-16 lg:py-24">
        <div className="section-container">
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 text-sm font-medium mb-8 hover:underline"
          >
            <ArrowLeft className="w-4 h-4" aria-hidden="true" />
            Back to all projects
          </Link>

          <motion.header
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="max-w-3xl"
          >
            <p className="text-[11px] sm:text-xs font-semibold tracking-[0.18em] uppercase text-muted-foreground mb-4">
              {project.role} • {project.timeframe}
            </p>
            <h1 className="font-serif-display text-[34px] sm:text-[44px] lg:text-[52px] leading-tight mb-5">
              <span className="mr-3" aria-hidden="true">{project.emoji}</span>
              {project.title}
            </h1>
            <p className="text-[17px] leading-[1.65] text-muted-foreground mb-6">
              {project.description}
            </p>
            <div className="flex flex-wrap gap-3">
              <Button asChild variant="outline">
                <a href={project.github} target="_blank" rel="noopener noreferrer">
                  <Github className="mr-2 w-4 h-4" aria-hidden="true" />
                  View code on GitHub
                </a>
              </Button>
              <Button asChild>
                <Link to="/contact">Discuss this work</Link>
              </Button>
            </div>
          </motion.header>

          <div className="mt-14 grid lg:grid-cols-3 gap-10 lg:gap-14 items-start">
            <div className="lg:col-span-2 space-y-12">
              <section aria-labelledby="problem-heading">
                <h2 id="problem-heading" className="font-serif-display text-2xl mb-3">
                  The problem
                </h2>
                <p className="text-muted-foreground leading-relaxed">{project.problem}</p>
              </section>

              <section aria-labelledby="approach-heading">
                <h2 id="approach-heading" className="font-serif-display text-2xl mb-3">
                  My approach
                </h2>
                <ol className="space-y-3">
                  {project.approach.map((step, i) => (
                    <li key={step} className="flex gap-4">
                      <span
                        aria-hidden="true"
                        className="shrink-0 w-7 h-7 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold inline-flex items-center justify-center"
                      >
                        {i + 1}
                      </span>
                      <span className="text-muted-foreground leading-relaxed">{step}</span>
                    </li>
                  ))}
                </ol>
              </section>

              <section aria-labelledby="impact-heading">
                <h2 id="impact-heading" className="font-serif-display text-2xl mb-3">
                  Impact
                </h2>
                <ul className="space-y-3">
                  {project.impact.map((item) => (
                    <li key={item} className="border-t border-border pt-3 text-muted-foreground leading-relaxed">
                      {item}
                    </li>
                  ))}
                </ul>
              </section>

              <section aria-labelledby="gallery-heading">
                <h2 id="gallery-heading" className="font-serif-display text-2xl mb-3">
                  Gallery
                </h2>
                <p className="text-sm text-muted-foreground mb-5">
                  Visuals from the project. Screenshots are being prepared — each panel describes
                  what it will show.
                </p>
                <div className="grid sm:grid-cols-2 gap-4">
                  {project.gallery.map((item) => (
                    <figure key={item.caption} className="card-glass overflow-hidden">
                      <div
                        className="flex items-center justify-center bg-secondary/50 border-b border-border"
                        style={{ aspectRatio: "4 / 3" }}
                      >
                        <ImageIcon className="w-7 h-7 text-muted-foreground" aria-hidden="true" />
                      </div>
                      <figcaption className="p-4">
                        <span className="block font-semibold text-sm mb-1">{item.caption}</span>
                        <span className="block text-sm text-muted-foreground">{item.detail}</span>
                      </figcaption>
                    </figure>
                  ))}
                </div>
              </section>
            </div>

            <aside className="lg:col-span-1 space-y-8 lg:sticky lg:top-28">
              <div className="card-glass p-6">
                <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-4">
                  Tech stack
                </h2>
                <ul className="flex flex-wrap gap-2">
                  {project.tech.map((tech) => (
                    <li
                      key={tech}
                      className="px-3 py-1 text-xs font-medium text-primary bg-primary/10 rounded-full"
                    >
                      {tech}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="card-glass p-6">
                <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-4">
                  Other projects
                </h2>
                <ul className="space-y-3">
                  {related.map((item) => (
                    <li key={item.slug}>
                      <Link to={`/projects/${item.slug}`} className="text-sm font-medium hover:underline">
                        {item.title}
                      </Link>
                      <p className="text-xs text-muted-foreground">{item.summary}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>
          </div>
        </div>
      </article>
    </div>
  );
};

export default ProjectDetailPage;
