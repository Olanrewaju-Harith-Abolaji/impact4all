import { motion } from "framer-motion";
import { Award } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";

type Item = {
  title: string;
  issuer: string;
  year: string;
  status: string;
  relevance: string;
};

const fellowships: Item[] = [
  {
    title: "Aspire Institute Fellow",
    issuer: "Aspire Institute",
    year: "2026",
    status: "Ongoing",
    relevance:
      "A leadership-development programme supporting first-generation students to strengthen skills for community and civic impact.",
  },
  {
    title: "Millennium Fellowship Campus Director",
    issuer: "United Nations Academic Impact and Millennium Campus Network",
    year: "2025",
    status: "Completed",
    relevance:
      "Participated in the Millennium Fellowship and progressed to Campus Director, supporting peer fellows and campus-level activities.",
  },
];

const certifications: Item[] = [
  {
    title: "Data Science",
    issuer: "National Information Technology Development Agency (NITDA)",
    year: "2024",
    status: "Completed",
    relevance:
      "Foundations in data analysis that support programme reporting and evidence-based decisions.",
  },
];

const memberships: Item[] = [
  {
    title: "McKinsey Forward",
    issuer: "McKinsey & Company",
    year: "",
    status: "Completed",
    relevance:
      "A professional-development programme covering communication, problem-solving and adaptive skills used in programme work.",
  },
];

const groups: Array<{ title: string; items: Item[] }> = [
  { title: "Fellowships and leadership programmes", items: fellowships },
  { title: "Certifications and professional learning", items: certifications },
  { title: "Memberships and networks", items: memberships },
];

export const Certifications = () => {
  return (
    <section id="certifications" className="py-20 lg:py-32 relative">
      <div className="section-container">
        <SectionHeader
          badge="Recognition"
          title="Recognition and professional development"
          description="Fellowships, learning programmes and networks that have supported my work."
        />

        <div className="max-w-3xl mx-auto space-y-10">
          {groups.map((group) => (
            <div key={group.title}>
              <h3 className="text-lg font-semibold font-display mb-4">{group.title}</h3>
              <div className="space-y-4">
                {group.items.map((item, index) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                    className="card-glass p-5"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-primary/10 border border-primary/20 rounded-xl flex items-center justify-center shrink-0">
                        <Award className="w-5 h-5 text-primary" aria-hidden="true" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <h4 className="font-semibold text-lg mb-1">{item.title}</h4>
                        <p className="text-sm text-muted-foreground mb-1">
                          {item.issuer}
                        </p>
                        <div className="flex flex-wrap gap-3 text-sm text-primary font-medium mb-2">
                          {item.year && <span>{item.year}</span>}
                          <span className="text-muted-foreground">•</span>
                          <span>{item.status}</span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {item.relevance}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
