import { motion } from "framer-motion";
import { ArrowRight, Download, Github, Linkedin, Twitter, Heart, Calendar, MessageCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useTypingEffect } from "@/hooks/useTypingEffect";
import profileImg from "@/assets/profile.jpg";

export const Hero = () => {
  const navigate = useNavigate();
  const typingText = useTypingEffect(
    ["SDG Advocate", "Project Manager", "Volunteer Leader", "Youth Changemaker"],
    80,
    40,
    2500
  );

  return (
    <section className="min-h-[calc(100vh-4rem)] flex items-center justify-center relative overflow-hidden">
      <div className="section-container relative z-10 py-16 lg:py-24">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="flex-1 text-center lg:text-left"
          >
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-white/70 backdrop-blur border border-white/60 rounded-full text-primary text-sm font-medium mb-6 shadow-sm"
            >
              <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
              Open to Opportunities
            </motion.div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-[1.05] mb-4">
              Driving{" "}
              <span className="text-gradient">Sustainable Change</span>
              <br />
              Through Leadership & Service
            </h1>

            <div className="h-10 mb-6 flex items-center justify-center lg:justify-start">
              <span className="text-xl lg:text-2xl text-primary font-semibold">
                {typingText}
                <span className="animate-pulse">|</span>
              </span>
            </div>

            <p className="text-lg lg:text-xl text-muted-foreground max-w-xl mb-4">
              SDG Champion, Project Manager & Volunteer Leader. Empowering communities through technology, inclusion, and sustainable development initiatives.
            </p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 border border-accent/20 rounded-full text-accent text-sm font-medium mb-8"
            >
              <Heart className="w-4 h-4" />
              Disability Inclusion Advocate
            </motion.div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8">
              <Button
                size="lg"
                onClick={() => navigate("/contact")}
                className="group bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-8 rounded-full glow-effect"
              >
                <Calendar className="mr-2 w-4 h-4" />
                Let's Connect
              </Button>
              <Button
                size="lg"
                onClick={() => navigate("/projects")}
                variant="outline"
                className="border-primary/30 bg-white/60 hover:bg-primary/10 hover:text-primary rounded-full group"
              >
                View Projects
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-primary/30 bg-white/60 hover:bg-primary/10 hover:text-primary rounded-full group"
              >
                <Download className="mr-2 w-4 h-4 group-hover:scale-110 transition-transform" />
                Download CV
              </Button>
            </div>

            <div className="flex gap-4 justify-center lg:justify-start">
              {[
                { icon: Github, href: "https://github.com", label: "GitHub" },
                { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
                { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
                { icon: MessageCircle, href: "https://wa.me/YOUR_NUMBER", label: "WhatsApp" },
              ].map(({ icon: Icon, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-3 bg-white/70 hover:bg-white border border-white/60 rounded-xl text-muted-foreground hover:text-primary transition-colors shadow-sm"
                  aria-label={label}
                >
                  <Icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="relative"
          >
            <div className="relative w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/25 via-accent/20 to-transparent rounded-3xl blur-2xl" />
              <div className="relative w-full h-full rounded-3xl border border-white/60 overflow-hidden shadow-xl">
                <img
                  src={profileImg}
                  alt="Olanrewaju Harith Abolaji"
                  className="w-full h-full object-cover object-top"
                />
                <div className="absolute bottom-4 left-4 px-3 py-1 bg-white/80 backdrop-blur border border-white/60 rounded-full text-xs text-primary font-medium">
                  Leadership • Impact • Data
                </div>
              </div>

              <motion.div
                animate={{ y: [-5, 5, -5] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-4 -right-4 px-4 py-2 bg-white border border-white/60 rounded-xl shadow-lg"
              >
                <span className="text-2xl">🎓</span>
              </motion.div>

              <motion.div
                animate={{ y: [5, -5, 5] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-4 -left-4 px-4 py-2 bg-white border border-white/60 rounded-xl shadow-lg"
              >
                <span className="text-2xl">🚀</span>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
