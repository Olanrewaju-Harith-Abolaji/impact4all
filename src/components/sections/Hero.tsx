import { ArrowRight, Download } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import profileImg from "@/assets/profile.jpg";

/**
 * Hero — Phase 1
 * Communicates: what he does, who benefits, verified evidence.
 * Uses only claims already present on the site.
 */
export const Hero = () => {
  const navigate = useNavigate();

  const stats = [
    { value: "2,500+", label: "Learners trained" },
    { value: "90%", label: "Completion rate" },
    { value: "4,000+", label: "Students represented" },
  ];

  return (
    <section
      aria-labelledby="hero-heading"
      className="relative overflow-hidden pt-28 pb-20 lg:pt-36 lg:pb-28"
    >
      <div className="section-container">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Copy — 60% */}
          <div className="lg:col-span-7 motion-safe:animate-[fade-up_.55s_ease-out_both]">
            <p className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold uppercase tracking-[0.14em] text-teal mb-6">
              <span aria-hidden className="inline-block w-6 h-px bg-teal" />
              IT Professional · Inclusive Development Advocate
            </p>

            <h1
              id="hero-heading"
              className="font-display font-medium text-ink leading-[1.05] tracking-tight text-[clamp(2.5rem,5.6vw,5rem)]"
            >
              Building inclusive digital pathways for young people across Africa.
            </h1>

            <p className="mt-7 text-lg lg:text-xl text-slate leading-relaxed prose-readable">
              I work at the intersection of technology, youth development and
              public policy — designing programmes, partnerships and digital
              initiatives that expand opportunity and strengthen inclusive
              leadership.
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-3 sm:gap-4">
              <Button
                onClick={() => navigate("/projects")}
                className="bg-teal hover:bg-teal/90 text-white font-semibold rounded-[10px] h-12 px-6 group"
              >
                Explore Selected Work
                <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Button>

              {/* Placeholder résumé destination — replace with real CV URL */}
              <Button
                asChild
                variant="outline"
                className="border-ink/15 bg-white text-ink hover:bg-teal-tint hover:text-ink rounded-[10px] h-12 px-6 font-semibold"
              >
                <a href="#" aria-label="Download résumé (PDF placeholder)">
                  <Download className="mr-2 w-4 h-4" />
                  Download Résumé
                </a>
              </Button>

              <button
                type="button"
                onClick={() => navigate("/contact")}
                className="group inline-flex items-center gap-1.5 text-ink font-semibold px-2 h-12 hover:text-teal transition-colors"
              >
                Discuss a collaboration
                <span
                  aria-hidden
                  className="transition-transform group-hover:translate-x-1"
                >
                  →
                </span>
              </button>
            </div>

            {/* Proof row — static, no count-up */}
            <dl className="mt-14 grid grid-cols-3 gap-6 sm:gap-10 max-w-xl border-t border-line pt-8">
              {stats.map((s) => (
                <div key={s.label}>
                  <dt className="sr-only">{s.label}</dt>
                  <dd className="font-display text-3xl sm:text-4xl font-semibold text-ink leading-none">
                    {s.value}
                  </dd>
                  <p aria-hidden className="mt-2 text-xs sm:text-sm text-slate leading-snug">
                    {s.label}
                  </p>
                </div>
              ))}
            </dl>
          </div>

          {/* Portrait — 40% */}
          <div className="lg:col-span-5">
            <figure className="relative mx-auto max-w-md lg:max-w-none">
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl border border-line bg-teal-tint">
                <img
                  src={profileImg}
                  alt="Portrait of Olanrewaju Harith Abolaji"
                  width={800}
                  height={1000}
                  className="w-full h-full object-cover object-top"
                  loading="eager"
                  decoding="async"
                  fetchPriority="high"
                />
              </div>
              <figcaption className="sr-only">
                Olanrewaju Harith Abolaji — Founder, AccessEd Africa.
              </figcaption>

              {/* Belief plate */}
              <div className="hidden sm:block absolute -bottom-6 -left-4 lg:-left-8 max-w-[260px] bg-white border border-line rounded-xl p-4 shadow-[0_10px_30px_-18px_hsl(var(--ink)/0.35)]">
                <p className="font-display text-[15px] leading-snug text-ink">
                  “Inclusion is a leadership duty, not charity.”
                </p>
              </div>
            </figure>
          </div>
        </div>
      </div>
    </section>
  );
};
