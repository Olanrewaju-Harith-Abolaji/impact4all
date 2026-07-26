import { motion } from "framer-motion";
import { Heart, Users, Accessibility, Globe, Sparkles, HandHeart } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";

const advocacyAreas = [
  {
    icon: Accessibility,
    title: "Disability Inclusion",
    description:
      "Advocating for accessible technology and education, ensuring digital products and services are designed with persons with disabilities in mind.",
    color: "from-pink-500 to-rose-500",
  },
  {
    icon: Users,
    title: "Youth Empowerment",
    description:
      "Mentoring and inspiring young people to pursue careers in technology, providing guidance and resources to the next generation of innovators.",
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: Globe,
    title: "Tech for Good",
    description:
      "Building technology solutions that address social challenges, from sustainable transportation to cybersecurity awareness.",
    color: "from-green-500 to-emerald-500",
  },
  {
    icon: HandHeart,
    title: "Community Development",
    description:
      "Leading grassroots initiatives that create lasting positive change in local communities through technology and education.",
    color: "from-amber-500 to-orange-500",
  },
];

const impactStats = [
  { value: "100+", label: "People Mentored" },
  { value: "5+", label: "Community Projects" },
  { value: "3", label: "Organizations Led" },
  { value: "∞", label: "Lives Impacted" },
];

export const Advocacy = () => {
  return (
    <section id="advocacy" className="py-20 lg:py-32 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
      
      <div className="section-container relative">
        <SectionHeader
          badge="Making a Difference"
          title="Leadership & Advocacy"
          description="Committed to creating an inclusive world where technology empowers everyone"
        />

        {/* Main quote */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center mb-16"
        >
          <div className="relative">
            <Sparkles className="absolute -top-6 -left-6 w-8 h-8 text-primary/50" />
            <blockquote className="text-2xl lg:text-3xl font-display font-bold text-foreground italic">
              "Technology should be a bridge, not a barrier. My mission is to ensure 
              <span className="text-gradient"> everyone</span> can access and benefit from the digital world."
            </blockquote>
            <Sparkles className="absolute -bottom-6 -right-6 w-8 h-8 text-primary/50" />
          </div>
        </motion.div>

        {/* Advocacy areas */}
        <div className="grid md:grid-cols-2 gap-6 mb-16">
          {advocacyAreas.map((area, index) => (
            <motion.div
              key={area.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -4 }}
              className="card-glass p-6 group"
            >
              <div className="flex items-start gap-4">
                <div
                  className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${area.color} flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform`}
                >
                  <area.icon className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold font-display mb-2 group-hover:text-primary transition-colors">
                    {area.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {area.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Impact stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="card-glass p-8"
        >
          <div className="flex items-center justify-center gap-3 mb-8">
            <Heart className="w-6 h-6 text-primary" />
            <h3 className="text-xl font-bold font-display">Community Impact</h3>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {impactStats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl lg:text-5xl font-bold text-gradient mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground font-medium">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
