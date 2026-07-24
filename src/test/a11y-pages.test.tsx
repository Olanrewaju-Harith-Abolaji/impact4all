import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import { axe } from "jest-axe";
import { Layout } from "@/components/layout/Layout";
import HomePage from "@/pages/HomePage";
import AboutPage from "@/pages/AboutPage";
import SkillsPage from "@/pages/SkillsPage";
import ProjectsPage from "@/pages/ProjectsPage";
import InitiativesPage from "@/pages/InitiativesPage";
import ExperiencePage from "@/pages/ExperiencePage";
import AdvocacyPage from "@/pages/AdvocacyPage";
import AchievementsPage from "@/pages/AchievementsPage";
import BlogPage from "@/pages/BlogPage";
import ContactPage from "@/pages/ContactPage";

const cases: Array<[string, React.ComponentType]> = [
  ["/", HomePage],
  ["/about", AboutPage],
  ["/skills", SkillsPage],
  ["/projects", ProjectsPage],
  ["/initiatives", InitiativesPage],
  ["/experience", ExperiencePage],
  ["/advocacy", AdvocacyPage],
  ["/achievements", AchievementsPage],
  ["/blog", BlogPage],
  ["/contact", ContactPage],
];

describe("Page-level axe accessibility scans", () => {
  it.each(cases)("route %s has no obvious axe violations", async (path, Page) => {
    const { container } = render(
      <MemoryRouter initialEntries={[path]}>
        <Routes>
          <Route element={<Layout />}>
            <Route path={path} element={<Page />} />
          </Route>
        </Routes>
      </MemoryRouter>,
    );
    // Disable color-contrast (jsdom has no layout/computed colors) and
    // region rule (framer-motion renders animated wrappers around content).
    const results = await axe(container, {
      rules: {
        "color-contrast": { enabled: false },
        region: { enabled: false },
      },
    });
    expect(results).toHaveNoViolations();
  }, 15000);
});
