import { motion } from "framer-motion";
import { Users, Globe, Laptop, Target, ArrowUpRight, Heart, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionHeader } from "@/components/ui/SectionHeader";

const initiatives = [
  {
    title: "AccessEd Africa",
    role: "Founder & Project Manager",
    description:
      "An NGO bridging the digital gap for students with disabilities across Africa. We're building innovative software with onscreen readers and assistive technologies to make education accessible for all.",
    impact: "50,000+",
    impactLabel: "Students Targeted",
    features: [
      "Custom screen reader software",
      "Accessible learning platforms",
      "Disability inclusion training",
      "Partnership with schools & institutions",
    ],
    gradient: "from-primary via-accent to-primary",
    icon: Heart,
    status: "Active",
  },
  {
    title: "TechNexus",
    role: "Co-Founder",
    description:
      "A digital empowerment initiative focused on bridging the technology divide for underserved youth. We provide tech education, mentorship, and resources to help young people thrive in the digital economy.",
    impact: "1,000+",
    impactLabel: "Youth Empowered",
    features: [
      "Tech skills bootcamps",
      "Mentorship programs",
      "Digital literacy workshops",
      "Career guidance & placement",
    ],
    gradient: "from-accent via-primary to-accent",
    icon: Sparkles,
    status: "Active",
  },
];

export const FeaturedInitiatives = () => {
  return (
    <section id="initiatives" className="py-20 lg:py-32 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
      </div>

      <div className="section-container relative z-10">
        <SectionHeader
          badge="Leadership & Impact"
          title="Featured Initiatives"
          description="Social ventures and organizations I've founded to create lasting change in education and technology access"
        />

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {initiatives.map((initiative, index) => (
            <motion.div
              key={initiative.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2, duration: 0.6 }}
              className="group relative"
            >
              {/* Card */}
              <div className="relative h-full">
                {/* Gradient border effect */}
                <div className={`absolute -inset-[1px] bg-gradient-to-r ${initiative.gradient} rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm`} />
                
                <div className="relative h-full card-glass rounded-3xl p-8 lg:p-10 border border-border group-hover:border-transparent transition-colors duration-500">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex items-center gap-4">
                      <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${initiative.gradient} p-[1px]`}>
                        <div className="w-full h-full bg-background rounded-2xl flex items-center justify-center">
                          <initiative.icon className="w-6 h-6 text-primary" />
                        </div>
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold font-display">{initiative.title}</h3>
                        <p className="text-primary font-medium">{initiative.role}</p>
                      </div>
                    </div>
                    <span className="px-3 py-1 text-xs font-medium bg-green-500/10 text-green-400 rounded-full border border-green-500/20">
                      {initiative.status}
                    </span>
                  </div>

                  {/* Description */}
                  <p className="text-muted-foreground leading-relaxed mb-6">
                    {initiative.description}
                  </p>

                  {/* Impact stat */}
                  <div className="mb-6 p-4 bg-primary/5 rounded-2xl border border-primary/10">
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${initiative.gradient} flex items-center justify-center`}>
                        <Target className="w-6 h-6 text-background" />
                      </div>
                      <div>
                        <p className="text-3xl font-bold font-display text-gradient">{initiative.impact}</p>
                        <p className="text-sm text-muted-foreground">{initiative.impactLabel}</p>
                      </div>
                    </div>
                  </div>

                  {/* Features */}
                  <div className="space-y-3 mb-8">
                    {initiative.features.map((feature, i) => (
                      <motion.div
                        key={feature}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.2 + i * 0.1 }}
                        className="flex items-center gap-3"
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                        <span className="text-sm text-muted-foreground">{feature}</span>
                      </motion.div>
                    ))}
                  </div>

                  {/* CTA */}
                  <Button
                    variant="outline"
                    className="w-full group/btn border-primary/20 hover:border-primary hover:bg-primary/5"
                  >
                    Learn More
                    <ArrowUpRight className="w-4 h-4 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Interested in collaborating on social impact projects? I'm always looking for partners who share my vision of accessible education and digital empowerment.
          </p>
          <Button
            onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
            className="bg-primary hover:bg-primary/90"
          >
            <Heart className="w-4 h-4 mr-2" />
            Partner With Me
          </Button>
        </motion.div>
      </div>
    </section>
  );
};
