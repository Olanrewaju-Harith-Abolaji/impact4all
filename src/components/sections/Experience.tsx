import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const CV_URL =
  "https://drive.google.com/file/d/1X_Xh0KxP1R_VUR43YPzP05DCKxD9W2Qt/view?usp=sharing";

type Entry = {
  date: string;
  role: string;
  org: string;
  location?: string;
  category: string;
  current?: boolean;
  status?: string;
  description: string;
  points?: string[];
  note?: string;
};

type Group = {
  id: string;
  index: string;
  title: string;
  intro: string;
  compact?: boolean;
  entries: Entry[];
};

const groups: Group[] = [
  {
    id: "professional",
    index: "01",
    title: "Professional & Programme Leadership",
    intro:
      "Roles where I have contributed to programmes, institutions, digital inclusion and community-facing work.",
    entries: [
      {
        date: "2026 – Present",
        role: "National Youth Service Corps (NYSC) Corps Member",
        org: "Nigerian Midstream and Downstream Petroleum Regulatory Authority (NMDPRA)",
        location: "Abuja, Nigeria",
        category: "Professional",
        current: true,
        description:
          "Serving my national youth service year within a federal petroleum-sector regulator, where I apply data analysis, documentation and digital skills to unit-level work while gaining experience in a large public-sector institution.",
      },
      {
        date: "July 2024 – Present",
        role: "Co-founder / Team Lead",
        org: "AccessEd Africa, formerly TechNexus",
        category: "Programme Leadership",
        current: true,
        description:
          "Co-founded a digital-literacy initiative supporting young people in underserved communities to develop practical digital skills and greater confidence in using technology.",
        points: [
          "AccessEd Africa has reached more than 2,500 young people.",
          "Achieved a 90% programme completion rate, verified through attendance records, programme documentation and completion of assigned participant tasks.",
          "Support programme coordination, curriculum development, volunteer collaboration and community engagement.",
        ],
      },
      {
        date: "March 2024 – November 2024",
        role: "Data Analyst Intern",
        org: "National Centre for Artificial Intelligence and Robotics (NCAIR), NITDA",
        location: "Abuja, Nigeria",
        category: "Professional",
        description:
          "Supported data and product-related work through dataset cleaning, analysis, market research and business-model development.",
        points: [
          "Analysed multi-source datasets to support internal decision-making.",
          "Conducted market-feasibility research and industry benchmarking.",
          "Developed analytical and business-planning outputs for product teams.",
        ],
      },
      {
        date: "July 2024 – August 2025",
        role: "Departmental Stakeholder Chairman",
        org: "University of Ilorin",
        category: "Leadership",
        description:
          "Represented more than 4,000 students, serving as a link between student concerns and departmental decision-making.",
        points: [
          "Advocated for access to academic, technical and professional-development opportunities.",
          "Supported student engagement and representation across departmental matters.",
          "Developed practical experience in stakeholder communication, accountability and representation.",
        ],
      },
      {
        date: "September 2024 – Present",
        role: "Millennium Fellow / Campus Director",
        org: "United Nations Academic Impact & Millennium Campus Network",
        category: "Leadership",
        current: true,
        description:
          "Participated in the Millennium Fellowship and later progressed to Campus Director, supporting campus-level leadership and social-impact engagement.",
        points: [
          "Applied fellowship learning through community-facing digital-literacy activities.",
          "Supported leadership development and SDG-aligned project engagement.",
          "Contributed to strengthening participation and accountability within the campus fellowship community.",
        ],
      },
    ],
  },
  {
    id: "fellowships",
    index: "02",
    title: "Fellowships & Leadership Development",
    intro:
      "Structured programmes that have strengthened my leadership, problem-solving, collaboration and professional development.",
    compact: true,
    entries: [
      {
        date: "July 2026 – Present",
        role: "Leadership Fellow",
        org: "African Centre for Leadership, Strategy & Development (Centre LSD)",
        category: "Fellowship",
        current: true,
        description:
          "Strengthening strategic leadership and organisational-development skills through structured learning focused on social impact and programme design.",
      },
      {
        date: "July 2026 – Present",
        role: "Leadership Fellow",
        org: "The Fort Institute",
        category: "Fellowship",
        current: true,
        description:
          "Participating in structured leadership development anchored by a practical capstone project focused on community outcomes.",
      },
      {
        date: "July 2026 – Present",
        role: "Mentee",
        org: "The Tube Mentorship Programme — Cohort 5",
        category: "Fellowship",
        current: true,
        description:
          "Participating in a six-month mentorship experience focused on personal productivity, professional growth and practical leadership development.",
      },
      {
        date: "March 2026 – Present",
        role: "Member",
        org: "SDSN Youth Nigeria",
        category: "Community",
        current: true,
        description:
          "Participating in youth-led sustainable-development activities and engagement around the localisation of the Sustainable Development Goals in Nigeria.",
      },
      {
        date: "January 2026 – Present",
        role: "Member / Participant",
        org: "Common Futures Conversations, Chatham House",
        category: "Fellowship",
        current: true,
        description:
          "Participating in international dialogue on governance, public policy and sustainable development while strengthening policy-analysis and cross-cultural communication skills.",
      },
      {
        date: "March 2026 – July 2026",
        role: "Fellow / Participant",
        org: "McKinsey Forward",
        category: "Fellowship",
        status: "Completed",
        description:
          "Completed professional-development training focused on structured problem-solving, communication, adaptability and workplace effectiveness.",
      },
      {
        date: "February 2026 – April 2026",
        role: "Fellow",
        org: "Aspire Leadership Programme, Aspire Institute",
        category: "Fellowship",
        status: "Completed",
        description:
          "Completed leadership development with an international cohort, strengthening strategic thinking, collaboration and approaches to social challenges.",
      },
    ],
  },
  {
    id: "community",
    index: "03",
    title: "Community & Volunteer Leadership",
    intro:
      "Experiences through which I have contributed to mentorship, education, advocacy and community participation.",
    compact: true,
    entries: [
      {
        date: "June 2026 – Present",
        role: "Volunteer Facilitator",
        org: "Acquaint",
        category: "Volunteer",
        current: true,
        description:
          "Facilitate community sessions and small-group activities designed to encourage dialogue, participation and human connection.",
      },
      {
        date: "March 2026 – Present",
        role: "Member",
        org: "Right to Education Youth Network",
        category: "Community",
        current: true,
        description:
          "Contribute to advocacy and reporting on the right to education, helping strengthen the evidence base for inclusion and access among marginalised populations across Africa.",
      },
      {
        date: "February 2026 – Present",
        role: "Member / Participant",
        org: "Ages of Globalisation",
        category: "Community",
        current: true,
        description:
          "Participated in global learning and dialogue exploring responses to sustainable-development challenges.",
      },
      {
        date: "November 2022 – August 2025",
        role: "Member & Advocate",
        org: "Drug-Free Club, University of Ilorin",
        category: "Volunteer",
        status: "Completed",
        description:
          "Supported drug-abuse prevention advocacy through student and school outreach.",
        points: [
          "Participated in awareness activities reaching seven schools, most of them public schools.",
        ],
      },
    ],
  },
  {
    id: "education",
    index: "04",
    title: "Education",
    intro: "Academic foundation in information systems, data and digital technologies.",
    compact: true,
    entries: [
      {
        date: "May 2021 – August 2025",
        role: "B.Sc. Information and Communication Science",
        org: "University of Ilorin",
        category: "Education",
        status: "Second Class Upper Honours",
        description:
          "My studies strengthened my understanding of information systems, digital technologies, data and how access to information influences participation and opportunity. Relevant areas included Data Analysis, Human–Computer Interaction, Cybersecurity and Product Evaluation.",
        note: "Also served as Departmental Stakeholder Chairman, representing 4,000+ students.",
      },
    ],
  },
];

const ExperienceCard = ({ entry, compact }: { entry: Entry; compact?: boolean }) => (
  <article
    className={`rounded-[15px] border bg-card transition-colors duration-200 hover:border-primary/40 ${
      compact ? "p-5 sm:p-6" : "p-6 sm:p-7"
    } ${entry.current ? "border-l-2 border-l-primary bg-primary/[0.03]" : ""}`}
  >
    <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-2">
      <div className="flex flex-wrap items-center gap-3">
        <time className="text-[13px] sm:text-sm text-muted-foreground">{entry.date}</time>
        <span className="rounded-full border border-primary/20 bg-primary/[0.07] px-2 py-0.5 text-[11px] font-medium uppercase tracking-wide text-primary">
          {entry.category}
        </span>
      </div>
      {(entry.current || entry.status) && (
        <span className="text-[13px] font-medium text-muted-foreground">
          {entry.current ? "Current" : entry.status}
        </span>
      )}
    </div>

    <h4 className={`mt-3 font-semibold ${compact ? "text-[17px]" : "text-lg sm:text-xl"}`}>
      {entry.role}
    </h4>
    <p className="mt-0.5 text-[15px] text-primary">{entry.org}</p>
    {entry.location && (
      <p className="text-[13px] text-muted-foreground">{entry.location}</p>
    )}

    <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">
      {entry.description}
    </p>

    {entry.points && entry.points.length > 0 && (
      compact ? (
        <ul className="mt-3 space-y-1.5 text-[15px] text-muted-foreground">
          {entry.points.map((p) => (
            <li key={p} className="flex gap-2">
              <span aria-hidden="true" className="mt-2 h-1 w-1 shrink-0 rounded-full bg-primary" />
              <span>{p}</span>
            </li>
          ))}
        </ul>
      ) : (
        <details className="group mt-3">
          <summary className="inline-flex min-h-[44px] cursor-pointer items-center text-[15px] font-medium text-primary">
            View details
          </summary>
          <ul className="mt-2 space-y-1.5 text-[15px] text-muted-foreground">
            {entry.points.map((p) => (
              <li key={p} className="flex gap-2">
                <span aria-hidden="true" className="mt-2 h-1 w-1 shrink-0 rounded-full bg-primary" />
                <span>{p}</span>
              </li>
            ))}
          </ul>
        </details>
      )
    )}

    {entry.note && (
      <p className="mt-3 text-[13px] text-muted-foreground">{entry.note}</p>
    )}
  </article>
);

export const Experience = () => {
  return (
    <section id="experience" className="py-16 lg:py-24">
      <div className="mx-auto w-full max-w-[1120px] px-5 sm:px-8">
        <header className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
            Professional journey
          </p>
          <h1 className="mt-3 text-3xl font-bold sm:text-4xl lg:text-5xl">
            Experience &amp; Leadership
          </h1>
          <p className="mt-4 text-[16px] leading-relaxed text-muted-foreground">
            Professional work, community leadership and development programmes that have
            shaped how I work, lead and collaborate.
          </p>
        </header>

        <nav aria-label="Experience sections" className="mt-8 border-y py-3">
          <ul className="flex flex-wrap gap-x-6 gap-y-2 text-[14px]">
            {groups.map((g) => (
              <li key={g.id}>
                <a
                  href={`#${g.id}`}
                  className="inline-flex min-h-[44px] items-center text-muted-foreground hover:text-primary"
                >
                  {g.title}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="mt-12 space-y-20 lg:space-y-24">
          {groups.map((group) => (
            <section
              key={group.id}
              id={group.id}
              aria-labelledby={`${group.id}-heading`}
              className="scroll-mt-28 lg:grid lg:grid-cols-[240px_1fr] lg:gap-12"
            >
              <div className="lg:sticky lg:top-28 lg:self-start">
                <span className="text-[13px] font-mono text-muted-foreground">
                  {group.index}
                </span>
                <h2
                  id={`${group.id}-heading`}
                  className="mt-1 text-2xl font-semibold lg:text-[26px]"
                >
                  {group.title}
                </h2>
                <p className="mt-2 text-[14px] leading-relaxed text-muted-foreground">
                  {group.intro}
                </p>
              </div>

              <div className="mt-6 space-y-4 lg:mt-0">
                {group.entries.map((entry) => (
                  <ExperienceCard
                    key={entry.role + entry.org}
                    entry={entry}
                    compact={group.compact}
                  />
                ))}
              </div>
            </section>
          ))}
        </div>

        <div className="mt-20 rounded-[15px] border p-6 sm:p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
            Open to opportunities
          </p>
          <h2 className="mt-3 text-2xl font-semibold sm:text-3xl">
            Interested in working together?
          </h2>
          <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-muted-foreground">
            I’m open to employment, consulting, research, fellowships, speaking, programme
            partnerships and other mission-aligned opportunities.
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-5">
            <Button asChild>
              <Link to="/contact">Start a conversation</Link>
            </Button>
            <a
              href={CV_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[15px] font-medium text-primary underline underline-offset-4"
            >
              Download my CV
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
