import { motion } from "framer-motion";
import { ArrowRight, Download, Github, Linkedin, Twitter, Users, MessageCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useTypingEffect } from "@/hooks/useTypingEffect";
import profileImg from "@/assets/profile.jpg";

export const Hero = () => {
  const navigate = useNavigate();
  const typingText = useTypingEffect(
    [
      "Digital Literacy Advocate",
      "Youth Leadership Practitioner",
      "Disability Inclusion Advocate",
      "Community Development",
    ],
    80,
    40,
    2500,
  );

  return (
    <section className="min-h-[calc(100vh-4rem)] flex items-center justify-center relative overflow-hidden" aria-labelledby="hero-heading">
      <div className="section-container relative z-10 py-16 lg:py-24">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="flex-1 text-center lg:text-left"
          >
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-white/70 backdrop-blur border border-white/60 rounded-full text-black text-[11px] sm:text-xs font-semibold tracking-[0.14em] uppercase mb-6 shadow-sm"
            >
              <span className="w-2 h-2 bg-black rounded-full" aria-hidden="true" />
              Digital Literacy • Youth Leadership • Inclusive Development
            </motion.p>

            <h1
              id="hero-heading"
              className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-[1.05] mb-4 text-black"
            >
              Expanding access to{" "}
              <span className="text-gradient">skills, leadership</span>
              <br />
              and opportunity.
            </h1>

            <div className="h-10 mb-6 flex items-center justify-center lg:justify-start" aria-hidden="true">
              <span className="text-lg lg:text-xl text-black font-semibold">
                {typingText}
                <span className="animate-pulse">|</span>
              </span>
            </div>

            <p className="text-lg lg:text-xl text-black/80 max-w-2xl mb-4">
              I support young people and communities through digital-literacy education, leadership development, inclusive programmes and advocacy for the meaningful participation of persons with disabilities.
            </p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-white/70 border border-black/10 rounded-full text-black text-sm font-medium mb-8"
            >
              <Users className="w-4 h-4" aria-hidden="true" />
              Millennium Fellow • Community & Youth Programmes
            </motion.div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8">
              <Button
                size="lg"
                onClick={() => navigate("/projects")}
                className="group bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-8 rounded-full glow-effect"
              >
                Explore my work
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => navigate("/contact")}
                className="rounded-full group"
              >
                <Download className="mr-2 w-4 h-4 group-hover:scale-110 transition-transform" aria-hidden="true" />
                Download my CV
              </Button>
            </div>

            <ul className="flex gap-4 justify-center lg:justify-start" aria-label="Social links">
              {[
                { icon: Github, href: "https://github.com", label: "GitHub" },
                { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
                { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
                { icon: MessageCircle, href: "https://wa.me/YOUR_NUMBER", label: "WhatsApp" },
              ].map(({ icon: Icon, href, label }) => (
                <li key={label}>
                  <motion.a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="inline-flex p-3 bg-white/70 hover:bg-white border border-white/60 rounded-xl text-black transition-colors shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2"
                    aria-label={label}
                  >
                    <Icon className="w-5 h-5" aria-hidden="true" />
                  </motion.a>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="relative"
          >
            <div className="relative w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/15 via-black/10 to-transparent rounded-3xl blur-2xl" aria-hidden="true" />
              <div className="relative w-full h-full rounded-3xl border border-white/60 overflow-hidden shadow-xl">
                <img
                  src={profileImg}
                  alt="Portrait of Olanrewaju Harith A."
                  className="w-full h-full object-cover object-top"
                />
                <div className="absolute bottom-4 left-4 px-3 py-1 bg-white/85 backdrop-blur border border-white/60 rounded-full text-xs text-black font-medium">
                  Access • Leadership • Inclusion
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

