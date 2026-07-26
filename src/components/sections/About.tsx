import { motion } from "framer-motion";
import { GraduationCap, Users, Accessibility, HandHeart, Award, BookOpen } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";

const highlights = [
  {
    icon: BookOpen,
    title: "Digital literacy advocate",
    description:
      "Supporting practical and accessible digital learning for underserved communities.",
  },
  {
    icon: Users,
    title: "Youth leadership practitioner",
    description:
      "Drawing on student representation, mentorship and community leadership experience.",
  },
  {
    icon: Accessibility,
    title: "Disability inclusion advocate",
    description:
      "Promoting meaningful participation in education, technology, employment and community life.",
  },
  {
    icon: HandHeart,
    title: "AccessEd Africa co-founder",
    description:
      "Helping lead an initiative that has reached more than 2,500 young people.",
  },
  {
    icon: Award,
    title: "Millennium Fellowship Campus Director",
    description:
      "Supporting campus-level leadership through the United Nations Academic Impact and Millennium Campus Network fellowship programme.",
  },
  {
    icon: GraduationCap,
    title: "Information and Communication Science graduate",
    description:
      "Bringing an understanding of information, technology and data to community-focused work.",
  },
];

export const About = () => {
  return (
    <section id="about" className="py-20 lg:py-32 relative">
      <div className="section-container">
        <SectionHeader
          badge="About"
          title="Why access, leadership and inclusion matter to me"
          description="Digital literacy, youth leadership, community development and disability inclusion."
        />

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-5"
          >
            <p className="text-lg text-muted-foreground leading-relaxed">
              I became interested in digital inclusion after seeing capable
              young people excluded from opportunities because they lacked
              access, guidance or early exposure. Their ability was not the
              problem. The barriers were often limited infrastructure, few
              learning opportunities and systems that were not designed around
              their circumstances.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              My work today spans digital literacy, youth leadership, community
              development and disability inclusion.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              I studied Information and Communication Science at the{" "}
              <span className="text-foreground font-semibold">University of Ilorin</span>, where I
              also served as Departmental Stakeholder Chairman and represented
              more than 4,000 students. That responsibility taught me that
              leadership is not simply about speaking for people. It requires
              listening carefully, communicating their concerns accurately and
              remaining accountable for what happens next.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              That experience helped shape{" "}
              <span className="text-foreground font-semibold">AccessEd Africa, formerly TechNexus</span>.
              I co-founded the initiative to help young people in underserved
              communities develop practical digital skills and gain greater
              confidence in using technology.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              AccessEd Africa has reached more than 2,500 young people, with a
              90% programme completion rate verified through attendance records,
              programme documentation and completion of assigned participant
              tasks. The programme is designed around the realities participants
              face, including limited infrastructure, uneven access to devices
              and little previous exposure to structured digital education.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              My commitment to inclusion extends beyond digital access. I
              advocate for the meaningful participation of persons with
              disabilities in education, technology, employment, leadership and
              community programmes. Inclusion should be reflected in how
              programmes are designed, how information is communicated and
              whose experiences are considered when decisions are made.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Leadership fellowships and professional-development programmes
              have helped me strengthen this work. Through the Millennium
              Fellowship, organised by United Nations Academic Impact and
              Millennium Campus Network, I progressed to Campus Director.
              Experiences with Aspire Institute, McKinsey Forward and other
              leadership and policy networks have also introduced me to
              different approaches to problem-solving, collaboration and
              community development.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              My background includes experience in technology, data analysis
              and institutional environments. These skills help me organise
              information, understand patterns and communicate evidence, but I
              use them mainly to support better programmes and decisions.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              My long-term goal is to contribute to an Africa where young
              people and persons with disabilities are not treated merely as
              recipients of development programmes. They should have the
              skills, confidence and opportunity to help design, lead and
              evaluate the systems intended to serve them.
            </p>
          </motion.div>

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
                  <item.icon className="w-6 h-6 text-primary" aria-hidden="true" />
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
