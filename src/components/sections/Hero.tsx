import { useReducedMotion, motion } from "framer-motion";
import { ArrowRight, Download, Github, Linkedin, MessageCircle, Mail } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import profileImg from "@/assets/profile.jpg";

// Verified CV (Google Drive). Opens the PDF in a new tab.
const CV_URL: string | null =
  "https://drive.google.com/file/d/1X_Xh0KxP1R_VUR43YPzP05DCKxD9W2Qt/view?usp=sharing";

const credibility = [
  { value: "2,500+", label: "Young people reached" },
  { value: "90%", label: "Programme completion" },
  { value: "4,000+", label: "Students represented" },
];

const WHATSAPP_URL = "https://wa.me/2348133644304";
const EMAIL_URL = "mailto:haritholanrewaju@gmail.com";
const LINKEDIN_URL = "https://www.linkedin.com/in/olanrewajuharithabolaji";
const GITHUB_URL = "https://github.com/Olanrewaju-Harith-Abolaji";

const socialLinks = [
  { icon: Linkedin, href: LINKEDIN_URL, label: "Visit my LinkedIn profile" },
  { icon: Github, href: GITHUB_URL, label: "Visit my GitHub profile" },
  { icon: MessageCircle, href: WHATSAPP_URL, label: "Contact me on WhatsApp" },
  { icon: Mail, href: EMAIL_URL, label: "Send me an email" },
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
          {/* Copy */}
          <div className="lg:col-span-7 order-2 lg:order-1">
            <motion.p
              {...fade(8, 0.3)}
              className="text-[11px] sm:text-xs font-semibold tracking-[0.18em] uppercase text-[color:var(--brand-text-secondary)] mb-6"
            >
              Digital Literacy • Youth Leadership • Disability Inclusion
            </motion.p>

            <motion.h1
              id="hero-heading"
              {...fade(12, 0.42)}
              className="font-serif-display text-[38px] sm:text-[48px] lg:text-[60px] xl:text-[64px] text-foreground mb-6 max-w-[18ch]"
            >
              Expanding access to digital skills, leadership and opportunity.
            </motion.h1>

            <motion.p
              {...fade(0, 0.36)}
              className="text-[17px] leading-[1.65] text-[color:var(--brand-text-secondary)] mb-8"
              style={{ maxWidth: "620px" }}
            >
              I work with young people and underserved communities in Nigeria,
              with a wider commitment to digital inclusion across Africa.
              Through training, mentorship, advocacy and programme coordination,
              I promote practical digital learning and the meaningful
              participation of persons with disabilities in education,
              technology and community life.
            </motion.p>

            <motion.div
              {...fade(0, 0.3)}
              className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-4"
            >
              <Button
                size="lg"
                onClick={() => navigate("/initiatives")}
                className="group bg-primary hover:bg-[hsl(var(--primary-hover))] text-primary-foreground font-medium rounded-[var(--radius-button)] min-h-12 px-6"
              >
                Explore my work
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
                    Download my CV
                  </a>
                </Button>
              ) : (
                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => navigate("/contact")}
                  className="rounded-[var(--radius-button)] min-h-12 px-6 border-border text-foreground hover:bg-[color:var(--brand-surface-soft)]"
                >
                  Start a conversation
                </Button>
              )}
            </motion.div>

            {/* Availability supporting text */}
            <motion.p
              {...fade(0, 0.3)}
              className="text-sm text-[color:var(--brand-text-secondary)] mb-10"
              style={{ maxWidth: "620px" }}
            >
              Open to employment, consulting, fellowships, research, speaking
              and partnerships.
            </motion.p>

            {/* Credibility indicators */}
            <motion.ul
              {...fade(0, 0.3)}
              aria-label="Programme impact indicators"
              className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-8 max-w-[620px]"
            >
              {credibility.map((item) => (
                <li
                  key={item.label}
                  className="border-t border-border pt-3"
                >
                  <span className="sr-only">{`${item.value} — ${item.label}`}</span>
                  <div aria-hidden="true" className="font-serif-display text-2xl sm:text-3xl text-foreground leading-none">
                    {item.value}
                  </div>
                  <div aria-hidden="true" className="mt-1 text-sm text-[color:var(--brand-text-secondary)]">
                    {item.label}
                  </div>
                </li>
              ))}
            </motion.ul>

            {/* Social links */}
            <ul className="flex flex-wrap gap-2" aria-label="Contact and social profiles">
              {socialLinks.map(({ icon: Icon, href, label }) => {
                const isExternal = href.startsWith("http");
                return (
                  <li key={label}>
                    <a
                      href={href}
                      {...(isExternal
                        ? { target: "_blank", rel: "noopener noreferrer" }
                        : {})}
                      aria-label={label}
                      title={label}
                      className="inline-flex items-center justify-center min-h-11 min-w-11 rounded-[var(--radius-button)] border border-border bg-white text-foreground hover:bg-[color:var(--brand-surface-soft)] transition-colors focus-visible:outline-none"
                    >
                      <Icon className="w-5 h-5" aria-hidden="true" />
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Portrait */}
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
                  alt="Olanrewaju Harith Abolaji in a blue traditional outfit against a dark background."
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
