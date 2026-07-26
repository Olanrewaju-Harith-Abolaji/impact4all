import { motion } from "framer-motion";
import { Target, ArrowUpRight, Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { SectionHeader } from "@/components/ui/SectionHeader";

const initiative = {
  title: "AccessEd Africa",
  subtitle: "Formerly TechNexus",
  role: "Co-founder",
  description:
    "AccessEd Africa is a digital literacy initiative helping young people in underserved Nigerian communities develop practical digital skills and confidence in using technology.",
  mission:
    "To make practical digital learning more accessible to young people in underserved communities.",
  approach:
    "AccessEd Africa designs learning activities around the realities participants face, including limited infrastructure, uneven access to devices and little previous exposure to structured digital education.",
  results: [
    "More than 2,500 young people reached.",
    "90% programme completion rate, verified through attendance records, programme documentation and completion of assigned participant tasks.",
  ],
  resultsNote:
    "The completion rate helps us understand whether participants were able to remain engaged and complete the learning process, rather than simply registering for the programme.",
  direction:
    "Expand into more underserved communities while maintaining programme quality, participant support and strong completion standards.",
  status: "Active",
};

export const FeaturedInitiatives = () => {
  const navigate = useNavigate();

  return (
    <section id="initiatives" className="py-20 lg:py-32 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
      </div>

      <div className="section-container relative z-10">
        <SectionHeader
          badge="Initiatives"
          title="AccessEd Africa"
          description="A digital literacy initiative supporting young people in underserved Nigerian communities."
        />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          <div className="card-glass rounded-3xl p-8 lg:p-10 border border-border">
            <div className="flex items-start justify-between mb-6 flex-wrap gap-3">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                  <Heart className="w-6 h-6 text-primary" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold font-display">{initiative.title}</h3>
                  <p className="text-sm text-muted-foreground">{initiative.subtitle}</p>
                  <p className="text-primary font-medium mt-1">{initiative.role}</p>
                </div>
              </div>
              <span className="px-3 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full border border-primary/20">
                {initiative.status}
              </span>
            </div>

            <p className="text-muted-foreground leading-relaxed mb-6">
              {initiative.description}
            </p>

            <div className="space-y-5 mb-6">
              <div>
                <h4 className="font-semibold text-foreground mb-1">Mission</h4>
                <p className="text-sm text-muted-foreground">{initiative.mission}</p>
              </div>
              <div>
                <h4 className="font-semibold text-foreground mb-1">Programme approach</h4>
                <p className="text-sm text-muted-foreground">{initiative.approach}</p>
              </div>
            </div>

            <div className="mb-6 p-5 bg-primary/5 rounded-2xl border border-primary/10">
              <div className="flex items-center gap-3 mb-3">
                <Target className="w-5 h-5 text-primary" aria-hidden="true" />
                <h4 className="font-semibold">Verified results</h4>
              </div>
              <ul className="space-y-2 mb-3">
                {initiative.results.map((r) => (
                  <li key={r} className="text-sm text-muted-foreground flex gap-2">
                    <span className="text-primary mt-0.5">•</span>
                    <span>{r}</span>
                  </li>
                ))}
              </ul>
              <p className="text-xs text-muted-foreground italic">
                {initiative.resultsNote}
              </p>
            </div>

            <div className="mb-8">
              <h4 className="font-semibold text-foreground mb-1">Future direction</h4>
              <p className="text-sm text-muted-foreground">{initiative.direction}</p>
            </div>

            <Button
              onClick={() => navigate("/projects")}
              variant="outline"
              className="group/btn border-primary/20 hover:border-primary hover:bg-primary/5"
            >
              Explore the initiative
              <ArrowUpRight className="ml-2 w-4 h-4 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" aria-hidden="true" />
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
