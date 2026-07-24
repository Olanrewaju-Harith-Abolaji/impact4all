import { describe, it, expect, beforeEach } from "vitest";
import { render, screen, within, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { axe } from "jest-axe";
import { Navbar } from "@/components/layout/Navbar";
import { Layout } from "@/components/layout/Layout";
import { Routes, Route } from "react-router-dom";

const renderNavbar = () =>
  render(
    <MemoryRouter>
      <Navbar />
    </MemoryRouter>,
  );

describe("Navbar accessibility", () => {
  beforeEach(() => {
    // reset viewport-related state
    document.body.style.overflow = "";
  });

  it("mobile toggle exposes correct ARIA attributes", async () => {
    const user = userEvent.setup();
    renderNavbar();
    const toggle = screen.getByRole("button", { name: /open menu/i });
    expect(toggle).toHaveAttribute("aria-expanded", "false");
    expect(toggle).toHaveAttribute("aria-controls", "mobile-menu");

    await user.click(toggle);
    expect(toggle).toHaveAttribute("aria-expanded", "true");
    expect(toggle).toHaveAccessibleName(/close menu/i);
  });

  it("mobile menu is a modal dialog with an accessible name", async () => {
    const user = userEvent.setup();
    renderNavbar();
    await user.click(screen.getByRole("button", { name: /open menu/i }));
    const dialog = await screen.findByRole("dialog", { name: /mobile navigation/i });
    expect(dialog).toHaveAttribute("aria-modal", "true");
  });

  it("closes on Escape and restores focus to the toggle", async () => {
    const user = userEvent.setup();
    renderNavbar();
    const toggle = screen.getByRole("button", { name: /open menu/i });
    await user.click(toggle);
    await screen.findByRole("dialog");
    await user.keyboard("{Escape}");
    await waitFor(() =>
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument(),
    );
    expect(document.activeElement).toBe(toggle);
  });

  it("traps Tab focus inside the open mobile menu", async () => {
    const user = userEvent.setup();
    renderNavbar();
    await user.click(screen.getByRole("button", { name: /open menu/i }));
    const dialog = await screen.findByRole("dialog");
    const focusables = within(dialog).getAllByRole("link");
    const last = focusables[focusables.length - 1];
    last.focus();
    await user.tab();
    // Focus should wrap to something still inside the dialog
    expect(dialog.contains(document.activeElement)).toBe(true);
  });

  it("has no obvious axe violations", async () => {
    const { container } = renderNavbar();
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});

describe("Layout skip link", () => {
  it("renders a visible-on-focus skip-to-content link targeting #main-content", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<div>Page</div>} />
          </Route>
        </Routes>
      </MemoryRouter>,
    );
    const link = screen.getByRole("link", { name: /skip to main content/i });
    expect(link).toHaveAttribute("href", "#main-content");
    expect(document.getElementById("main-content")).not.toBeNull();
  });
});
