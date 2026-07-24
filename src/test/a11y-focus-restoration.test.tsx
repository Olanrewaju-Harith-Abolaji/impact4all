import { describe, it, expect } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Routes, Route, useNavigate } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";

/**
 * Focus-restoration tests use the real Layout (which renders the persistent
 * Navbar). The "Contact" NavLink stays mounted across route changes, so we
 * can assert that navigating back restores focus to the exact link that
 * triggered the forward navigation.
 */

const HomeStub = () => <h1>Home</h1>;
const ContactStub = () => {
  const navigate = useNavigate();
  return (
    <div>
      <h1>Contact</h1>
      <button type="button" data-testid="go-back" onClick={() => navigate(-1)}>
        Back
      </button>
    </div>
  );
};

const renderApp = (initial = "/") =>
  render(
    <MemoryRouter initialEntries={[initial]}>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomeStub />} />
          <Route path="/contact" element={<ContactStub />} />
        </Route>
      </Routes>
    </MemoryRouter>,
  );

const contactNavLink = () => {
  // Two "Contact" links exist (desktop nav + mobile nav container). Pick the
  // desktop one — it's a plain anchor that is always in the DOM.
  const links = screen.getAllByRole("link", { name: /^contact$/i });
  return links[0];
};

describe("Focus restoration on route changes", () => {
  it("focuses <main> after a forward navigation", async () => {
    const user = userEvent.setup();
    renderApp("/");
    await user.click(contactNavLink());
    await waitFor(() =>
      expect(screen.getByRole("heading", { name: "Contact" })).toBeInTheDocument(),
    );
    await waitFor(() => {
      expect(document.activeElement).toBe(document.getElementById("main-content"));
    });
  });

  it("main region is programmatically focusable (tabIndex=-1)", () => {
    renderApp("/");
    expect(document.getElementById("main-content")).toHaveAttribute("tabindex", "-1");
  });

  it("restores focus to the triggering nav link on back navigation", async () => {
    const user = userEvent.setup();
    renderApp("/");
    const trigger = contactNavLink();
    trigger.focus();
    await user.click(trigger);
    await waitFor(() =>
      expect(screen.getByRole("heading", { name: "Contact" })).toBeInTheDocument(),
    );

    await user.click(screen.getByTestId("go-back"));
    await waitFor(() =>
      expect(screen.getByRole("heading", { name: "Home" })).toBeInTheDocument(),
    );
    await waitFor(() => {
      expect(document.activeElement).toBe(trigger);
    });
  });
});
