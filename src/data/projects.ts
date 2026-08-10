export type ProjectGalleryItem = {
  caption: string;
  detail: string;
};

export type Project = {
  slug: string;
  title: string;
  emoji: string;
  summary: string;
  description: string;
  tech: string[];
  github: string;
  featured?: boolean;
  role: string;
  timeframe: string;
  problem: string;
  approach: string[];
  impact: string[];
  gallery: ProjectGalleryItem[];
};

export const projects: Project[] = [
  {
    slug: "salary-prediction-model",
    title: "Salary Prediction Model",
    emoji: "💰",
    summary: "Predicting fair salary ranges from experience, education and skills.",
    description:
      "Machine learning model to predict salaries based on experience, education, and skills. Includes data preprocessing and visualization.",
    tech: ["Python", "Scikit-Learn", "Pandas", "Matplotlib"],
    github: "https://github.com/Olanrewaju-Harith-Abolaji",
    featured: true,
    role: "Data analyst and developer",
    timeframe: "2024",
    problem:
      "Early-career professionals and the young people I mentor rarely have a reference point for what a role should pay, which weakens their negotiating position and reinforces existing pay gaps.",
    approach: [
      "Cleaned and standardised the raw salary dataset, handling missing values, duplicates and inconsistent job titles.",
      "Engineered features for years of experience, education level and skill clusters, then encoded categorical fields.",
      "Trained and compared linear and tree-based regression models, tuning hyperparameters with cross-validation.",
      "Visualised feature importance so the output can be explained in plain language during mentoring sessions.",
    ],
    impact: [
      "Produced an explainable salary range estimate that mentees can use to prepare for interviews.",
      "Surfaced which skills move earnings most, which now informs the digital-skills curriculum I facilitate.",
      "Documented the full workflow so other students can reproduce and extend the analysis.",
    ],
    gallery: [
      { caption: "Data cleaning notebook", detail: "Preprocessing steps, missing-value handling and encoding." },
      { caption: "Model comparison", detail: "Error metrics across the candidate regression models." },
      { caption: "Feature importance chart", detail: "Which experience and skill factors drive predicted pay." },
    ],
  },
  {
    slug: "company-profit-prediction",
    title: "Company Profit Prediction",
    emoji: "📈",
    summary: "Forecasting profit from spend patterns using regression analysis.",
    description:
      "Predictive analytics solution for forecasting company profits using regression analysis and historical data.",
    tech: ["Python", "NumPy", "Pandas", "Data Analysis"],
    github: "https://github.com/Olanrewaju-Harith-Abolaji",
    featured: true,
    role: "Data analyst and developer",
    timeframe: "2024",
    problem:
      "Small organisations and community initiatives often plan budgets on instinct, with no simple way to see how spending choices affect financial outcomes.",
    approach: [
      "Explored historical spend and profit data to check distributions, outliers and correlations.",
      "Built a multiple regression model relating operational spend categories to profit.",
      "Validated the model with a train/test split and residual analysis to check assumptions.",
      "Translated the coefficients into planning guidance a non-technical team can act on.",
    ],
    impact: [
      "Gave a clear view of which spend categories carry the strongest relationship with profit.",
      "Created a reusable planning template for budgeting conversations in community projects.",
      "Strengthened my practice in explaining statistical output to non-technical stakeholders.",
    ],
    gallery: [
      { caption: "Exploratory analysis", detail: "Distribution and correlation checks across spend categories." },
      { caption: "Regression output", detail: "Coefficients, fit quality and validation results." },
      { caption: "Planning view", detail: "Scenario table used in budget discussions." },
    ],
  },
  {
    slug: "web-scraping-analysis",
    title: "Web Scraping & Analysis",
    emoji: "🔍",
    summary: "An automated pipeline that collects and structures public web data.",
    description:
      "Automated data collection and analysis pipeline for gathering insights from web sources.",
    tech: ["Python", "BeautifulSoup", "Pandas", "Requests"],
    github: "https://github.com/Olanrewaju-Harith-Abolaji",
    role: "Developer",
    timeframe: "2024",
    problem:
      "Programme research and partnership scouting depended on manual copying from websites, which was slow, inconsistent and easy to get wrong.",
    approach: [
      "Mapped the target pages and defined the exact fields worth collecting.",
      "Built a resilient scraper with polite request pacing, retries and clear error handling.",
      "Normalised the extracted records into tidy tables ready for analysis and reporting.",
      "Added summary analysis and export steps so findings could be shared quickly.",
    ],
    impact: [
      "Reduced a repetitive research task from hours of manual work to a single scripted run.",
      "Improved data quality and consistency for programme and partnership research.",
      "Became the template I reuse whenever a new data-collection need appears.",
    ],
    gallery: [
      { caption: "Pipeline structure", detail: "Fetch, parse, normalise and export stages." },
      { caption: "Structured output", detail: "Cleaned dataset produced by the pipeline." },
      { caption: "Summary report", detail: "Aggregated findings shared with collaborators." },
    ],
  },
  {
    slug: "kekecruise",
    title: "Kekecruise",
    emoji: "🚲",
    summary: "A bicycle rental management system for everyday local mobility.",
    description:
      "Bicycle rental management system designed to streamline operations and enhance user experience.",
    tech: ["Python", "Database Design", "Operations"],
    github: "https://github.com/Olanrewaju-Harith-Abolaji",
    role: "Co-founder",
    timeframe: "Ongoing",
    problem:
      "Affordable short-distance transport is a daily constraint for students and low-income commuters, and small rental operators track bookings on paper.",
    approach: [
      "Designed the data model for bicycles, customers, rentals and availability.",
      "Built booking, return and availability logic to prevent double allocation.",
      "Added record keeping for pricing, durations and rental history.",
      "Kept the workflow simple enough for an operator with limited digital experience.",
    ],
    impact: [
      "Replaced manual booking records with a structured, searchable system.",
      "Made bicycle availability visible, reducing wasted trips for riders.",
      "Supports affordable, low-carbon local mobility for students and commuters.",
    ],
    gallery: [
      { caption: "Data model", detail: "Bicycles, customers and rental relationships." },
      { caption: "Booking flow", detail: "Reserve, collect and return steps." },
      { caption: "Operator view", detail: "Availability and rental history overview." },
    ],
  },
];

export const getProjectBySlug = (slug: string) =>
  projects.find((project) => project.slug === slug);
