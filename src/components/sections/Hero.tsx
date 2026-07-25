import { useReducedMotion, motion } from "framer-motion";
import { ArrowRight, Download, Github, Linkedin, Twitter, MessageCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import profileImg from "@/assets/profile.jpg";

// Stage One: if a verified CV link is provided later, set CV_URL to that path
// and the secondary CTA will switch from "Let's Collaborate" back to "Download My CV".
const CV_URL: string | null = null;

const credibility = [
  "Digital Literacy & Youth Development",
  "Disability Inclusion Advocacy",
  "Millennium Fellow",
];

const socialLinks = [
  { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
  { icon: Github, href: "https://github.com", label: "GitHub" },
  { icon: Twitter, href: "https://twitter.com", label: "X (Twitter)" },
  { icon: MessageCircle, href: "https://wa.me/", label: "WhatsApp" },
];

export const Hero = () => {
  const navigate = useNavigate();
  const prefersReducedMotion = useReducedMotion();

  const fade = (y: number, duration: number, delay = 0) =>
    prefersReducedMotion
      ? { initial: { opacity: 1 }, animate: { opacity: 1 } }
      : {
          initial: { opacity: 0, y },
          animate: { opacity: 1, y: 0 },
          transition: { duration, delay, ease: "easeOut" as const },
        };

  const portraitMotion = prefersReducedMotion
    ? { initial: { opacity: 1, scale: 1 }, animate: { opacity: 1, scale: 1 } }
    : {
        initial: { opacity: 0, scale: 0.985 },
        animate: { opacity: 1, scale: 1 },
        transition: { duration: 0.5, ease: "easeOut" as const },
      };

  return (
    <section
      className="relative pt-24 lg:pt-32 pb-16 lg:pb-24"
      aria-labelledby="hero-heading"
    >
      <div className="section-container">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Copy — 7 cols on desktop */}
          <div className="lg:col-span-7 order-2 lg:order-1">
            <motion.p
              {...fade(8, 0.3)}
              className="text-[11px] sm:text-xs font-semibold tracking-[0.18em] uppercase text-[color:var(--brand-text-secondary)] mb-6"
            >
              Digital Literacy • Youth Leadership • Inclusive Development
            </motion.p>

            <motion.h1
              id="hero-heading"
              {...fade(12, 0.42)}
              className="font-serif-display text-[38px] sm:text-[48px] lg:text-[60px] xl:text-[64px] text-foreground mb-6 max-w-[18ch]"
            >
              Building more inclusive pathways for young people and communities.
            </motion.h1>

            <motion.p
              {...fade(0, 0.36)}
              className="text-[17px] leading-[1.65] text-[color:var(--brand-text-secondary)] max-w-[68ch] mb-8"
            >
              I advocate for digital literacy, youth leadership, community
              development and the meaningful inclusion of persons with
              disabilities. Through training, mentorship, programme coordination
              and community engagement, I help expand access to skills,
              participation and opportunity.
            </motion.p>

            <motion.div
              {...fade(0, 0.3)}
              className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-10"
            >
              <Button
                size="lg"
                onClick={() => navigate("/initiatives")}
                className="group bg-primary hover:bg-[hsl(var(--primary-hover))] text-primary-foreground font-medium rounded-[var(--radius-button)] min-h-12 px-6"
              >
                Explore My Work
                <ArrowRight
                  className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-0.5"
                  aria-hidden="true"
                />
              </Button>

              {CV_URL ? (
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="rounded-[var(--radius-button)] min-h-12 px-6 border-border text-foreground hover:bg-[color:var(--brand-surface-soft)]"
                >
                  <a href={CV_URL} download>
                    <Download className="mr-2 w-4 h-4" aria-hidden="true" />
                    Download My CV
                  </a>
                </Button>
              ) : (
                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => navigate("/contact")}
                  className="rounded-[var(--radius-button)] min-h-12 px-6 border-border text-foreground hover:bg-[color:var(--brand-surface-soft)]"
                >
                  Let&rsquo;s Collaborate
                </Button>
              )}
            </motion.div>

            {/* Credibility indicators */}
            <motion.ul
              {...fade(0, 0.3)}
              aria-label="Areas of focus"
              className="flex flex-wrap gap-x-6 gap-y-2 mb-8"
            >
              {credibility.map((item) => (
                <li
                  key={item}
                  className="inline-flex items-center gap-2 text-sm text-[color:var(--brand-text-secondary)]"
                >
                  <span
                    aria-hidden="true"
                    className="inline-block w-1.5 h-1.5 rounded-full bg-[color:var(--brand-accent)]"
                  />
                  {item}
                </li>
              ))}
            </motion.ul>

            {/* Social links */}
            <ul className="flex gap-2" aria-label="Social profiles">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="inline-flex items-center justify-center min-h-11 min-w-11 rounded-[var(--radius-button)] border border-border bg-white text-foreground hover:bg-[color:var(--brand-surface-soft)] transition-colors focus-visible:outline-none"
                  >
                    <Icon className="w-5 h-5" aria-hidden="true" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Portrait — 5 cols on desktop, above copy on mobile per spec */}
          <motion.div
            {...portraitMotion}
            className="lg:col-span-5 order-1 lg:order-2"
          >
            <figure className="relative mx-auto lg:mx-0 w-full max-w-[420px]">
              <div
                className="overflow-hidden bg-[color:var(--brand-surface-soft)] border border-border"
                style={{
                  aspectRatio: "4 / 5",
                  borderRadius: "var(--radius-image)",
                }}
              >
                <img
                  src={profileImg}
                  alt="Portrait of Olanrewaju Harith A., digital literacy and youth development advocate."
                  width={800}
                  height={1000}
                  loading="eager"
                  decoding="async"
                  sizes="(min-width: 1024px) 420px, (min-width: 640px) 60vw, 90vw"
                  className="w-full h-full object-cover object-top"
                />
              </div>
            </figure>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
