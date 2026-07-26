import { motion } from "framer-motion";
import { SectionHeader } from "@/components/ui/SectionHeader";
import {
  BookOpen,
  Users,
  Accessibility,
  HandHeart,
  ClipboardList,
  Database,
} from "lucide-react";

const focusAreas = [
  {
    title: "Digital literacy and access",
    icon: BookOpen,
    description:
      "Helping young people and underserved communities develop practical digital skills, confidence and safer participation in an increasingly digital society.",
    evidence:
      "AccessEd Africa has reached more than 2,500 young people, with a 90% programme completion rate verified through attendance records, programme documentation and participant task completion.",
    direction:
      "Expand access without reducing programme quality or completion standards.",
    span: "md:col-span-2",
  },
  {
    title: "Youth leadership and development",
    icon: Users,
    description:
      "Supporting young people to build confidence, develop leadership skills and participate meaningfully in decisions affecting their communities.",
    evidence:
      "Represented more than 4,000 students as Departmental Stakeholder Chairman and progressed to Campus Director through the Millennium Fellowship.",
    direction:
      "Help more young people move from participation to responsible leadership.",
    span: "md:col-span-1",
  },
  {
    title: "Disability inclusion",
    icon: Accessibility,
    description:
      "Advocating for the meaningful participation of persons with disabilities in education, digital learning, employment, leadership and community programmes.",
    span: "md:col-span-1",
  },
  {
    title: "Community development",
    icon: HandHeart,
    description:
      "Supporting locally relevant initiatives that respond to community needs, strengthen participation and connect people with useful knowledge and opportunities.",
    span: "md:col-span-1",
  },
  {
    title: "Programme and partnership coordination",
    icon: ClipboardList,
    description:
      "Helping organise people, activities, communication, documentation and stakeholder relationships required to move initiatives from ideas to implementation.",
    span: "md:col-span-1",
  },
  {
    title: "Technology and data for development",
    icon: Database,
    description:
      "Using information, data and digital tools to support programme design, reporting, learning and evidence-based decisions.",
    span: "md:col-span-2",
  },
];

export const Skills = () => {
  return (
    <section id="skills" className="py-20 lg:py-32 bg-secondary/20 relative">
      <div className="section-container">
        <SectionHeader
          badge="Focus Areas"
          title="Where I focus my work"
          description="Six connected areas that guide the programmes, partnerships and advocacy I take on."
        />

        <div className="grid md:grid-cols-2 gap-5">
          {focusAreas.map((area, i) => (
            <motion.div
              key={area.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07 }}
              className={`card-glass p-6 ${area.span}`}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2.5 rounded-xl bg-primary/10 text-primary">
                  <area.icon className="w-5 h-5" aria-hidden="true" />
                </div>
                <h3 className="text-lg font-bold font-display">{area.title}</h3>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                {area.description}
              </p>
              {area.evidence && (
                <p className="text-sm text-foreground/90 mb-2">
                  <span className="font-semibold">Evidence: </span>
                  {area.evidence}
                </p>
              )}
              {area.direction && (
                <p className="text-sm text-muted-foreground">
                  <span className="font-semibold text-foreground">Direction: </span>
                  {area.direction}
                </p>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
