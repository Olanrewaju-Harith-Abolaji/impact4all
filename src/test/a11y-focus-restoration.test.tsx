import { describe, it, expect } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Routes, Route, Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";

const PageA = () => (
  <div>
    <h1>Page A</h1>
    <Link to="/b" data-testid="go-b">
      Go to B
    </Link>
  </div>
);
const PageB = () => (
  <div>
    <h1>Page B</h1>
    <Link to="/" data-testid="go-home">
      Home
    </Link>
  </div>
);

const renderApp = (initial = "/") =>
  render(
    <MemoryRouter initialEntries={[initial]}>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<PageA />} />
          <Route path="/b" element={<PageB />} />
        </Route>
      </Routes>
    </MemoryRouter>,
  );

describe("Focus restoration on route changes", () => {
  it("focuses <main> after a forward navigation", async () => {
    const user = userEvent.setup();
    renderApp("/");
    await user.click(screen.getByTestId("go-b"));
    await waitFor(() => expect(screen.getByRole("heading", { name: "Page B" })).toBeInTheDocument());
    await waitFor(() => {
      expect(document.activeElement).toBe(document.getElementById("main-content"));
    });
  });

  it("main region is programmatically focusable (tabIndex=-1)", () => {
    renderApp("/");
    expect(document.getElementById("main-content")).toHaveAttribute("tabindex", "-1");
  });

  it("restores focus to the triggering link on browser back navigation", async () => {
    const user = userEvent.setup();
    renderApp("/");
    const trigger = screen.getByTestId("go-b");
    trigger.focus();
    await user.click(trigger);
    await waitFor(() => screen.getByRole("heading", { name: "Page B" }));

    // Simulate browser back
    window.history.back();
    await waitFor(() => screen.getByRole("heading", { name: "Page A" }));
    await waitFor(() => {
      expect(document.activeElement).toBe(screen.getByTestId("go-b"));
    });
  });
});
