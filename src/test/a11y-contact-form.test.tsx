import { describe, it, expect } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { axe } from "jest-axe";
import { Contact } from "@/components/sections/Contact";

const renderContact = () =>
  render(
    <MemoryRouter>
      <Contact />
    </MemoryRouter>,
  );

describe("Contact form accessibility", () => {
  it("associates every input with a visible label", () => {
    renderContact();
    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/message/i)).toBeInTheDocument();
  });

  it("links inputs to hint text via aria-describedby by default", () => {
    renderContact();
    expect(screen.getByLabelText(/name/i)).toHaveAttribute("aria-describedby", "name-hint");
    expect(screen.getByLabelText(/email/i)).toHaveAttribute("aria-describedby", "email-hint");
    expect(screen.getByLabelText(/message/i)).toHaveAttribute("aria-describedby", "message-hint");
  });

  it("shows error messages, sets aria-invalid, and points aria-describedby to error id", async () => {
    const user = userEvent.setup();
    renderContact();
    await user.click(screen.getByRole("button", { name: /send message/i }));

    const nameInput = screen.getByLabelText(/name/i);
    const emailInput = screen.getByLabelText(/email/i);
    const messageInput = screen.getByLabelText(/message/i);

    expect(nameInput).toHaveAttribute("aria-invalid", "true");
    expect(nameInput).toHaveAttribute("aria-describedby", "name-error");
    expect(emailInput).toHaveAttribute("aria-invalid", "true");
    expect(messageInput).toHaveAttribute("aria-invalid", "true");

    // Error messages present with role=alert
    const alerts = screen.getAllByRole("alert");
    expect(alerts.length).toBeGreaterThanOrEqual(3);
    expect(screen.getByText(/please enter your name/i)).toBeInTheDocument();
    expect(screen.getByText(/please enter your email/i)).toBeInTheDocument();
    expect(screen.getByText(/please enter a message/i)).toBeInTheDocument();
  });

  it("moves focus to the first invalid field on submit", async () => {
    const user = userEvent.setup();
    renderContact();
    await user.click(screen.getByRole("button", { name: /send message/i }));
    await waitFor(() => {
      expect(document.activeElement).toBe(screen.getByLabelText(/name/i));
    });
  });

  it("moves focus to the email field when only email is invalid", async () => {
    const user = userEvent.setup();
    renderContact();
    await user.type(screen.getByLabelText(/name/i), "Harith");
    await user.type(screen.getByLabelText(/email/i), "not-an-email");
    await user.type(screen.getByLabelText(/message/i), "Hello there, testing.");
    await user.click(screen.getByRole("button", { name: /send message/i }));
    await waitFor(() => {
      expect(document.activeElement).toBe(screen.getByLabelText(/email/i));
    });
    expect(screen.getByText(/valid email address/i)).toBeInTheDocument();
  });

  it("clears validation state when the user provides valid input and resubmits", async () => {
    const user = userEvent.setup();
    renderContact();
    await user.click(screen.getByRole("button", { name: /send message/i }));
    expect(screen.getByLabelText(/name/i)).toHaveAttribute("aria-invalid", "true");

    await user.type(screen.getByLabelText(/name/i), "Harith");
    await user.type(screen.getByLabelText(/email/i), "hi@example.com");
    await user.type(screen.getByLabelText(/message/i), "Hello there, this is a real message.");
    await user.click(screen.getByRole("button", { name: /send message/i }));
    await waitFor(() => {
      expect(screen.getByLabelText(/name/i)).not.toHaveAttribute("aria-invalid");
    });
  });

  it("has no obvious axe violations in the default state", async () => {
    const { container } = renderContact();
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it("has no obvious axe violations in the error state", async () => {
    const user = userEvent.setup();
    const { container } = renderContact();
    await user.click(screen.getByRole("button", { name: /send message/i }));
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
