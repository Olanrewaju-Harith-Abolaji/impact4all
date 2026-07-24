import { describe, it, expect } from "vitest";
import { render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { axe } from "jest-axe";
import { Contact } from "@/components/sections/Contact";

const renderContact = () => {
  const utils = render(
    <MemoryRouter>
      <Contact />
    </MemoryRouter>,
  );
  const form = screen.getByRole("form", { name: /contact form/i });
  const q = within(form);
  return {
    ...utils,
    form,
    name: () => q.getByLabelText(/name/i),
    email: () => q.getByLabelText(/email/i),
    message: () => q.getByLabelText(/message/i),
    submit: () => q.getByRole("button", { name: /send message/i }),
  };
};

describe("Contact form accessibility", () => {
  it("associates every input with a visible label", () => {
    const { name, email, message } = renderContact();
    expect(name()).toBeInTheDocument();
    expect(email()).toBeInTheDocument();
    expect(message()).toBeInTheDocument();
  });

  it("links inputs to hint text via aria-describedby by default", () => {
    const { name, email, message } = renderContact();
    expect(name()).toHaveAttribute("aria-describedby", "name-hint");
    expect(email()).toHaveAttribute("aria-describedby", "email-hint");
    expect(message()).toHaveAttribute("aria-describedby", "message-hint");
  });

  it("shows error messages, sets aria-invalid, and points aria-describedby to error id", async () => {
    const user = userEvent.setup();
    const { submit, name, email, message } = renderContact();
    await user.click(submit());

    expect(name()).toHaveAttribute("aria-invalid", "true");
    expect(name()).toHaveAttribute("aria-describedby", "name-error");
    expect(email()).toHaveAttribute("aria-invalid", "true");
    expect(message()).toHaveAttribute("aria-invalid", "true");

    expect(screen.getByText(/please enter your name/i)).toBeInTheDocument();
    expect(screen.getByText(/please enter your email/i)).toBeInTheDocument();
    expect(screen.getByText(/please enter a message/i)).toBeInTheDocument();
  });

  it("moves focus to the first invalid field on submit", async () => {
    const user = userEvent.setup();
    const { submit, name } = renderContact();
    await user.click(submit());
    await waitFor(() => expect(document.activeElement).toBe(name()));
  });

  it("moves focus to the email field when only email is invalid", async () => {
    const user = userEvent.setup();
    const { name, email, message, submit } = renderContact();
    await user.type(name(), "Harith");
    await user.type(email(), "not-an-email");
    await user.type(message(), "Hello there, testing.");
    await user.click(submit());
    await waitFor(() => expect(document.activeElement).toBe(email()));
    expect(screen.getByText(/valid email address/i)).toBeInTheDocument();
  });

  it("clears validation state when the user provides valid input and resubmits", async () => {
    const user = userEvent.setup();
    const { submit, name, email, message } = renderContact();
    await user.click(submit());
    expect(name()).toHaveAttribute("aria-invalid", "true");

    await user.type(name(), "Harith");
    await user.type(email(), "hi@example.com");
    await user.type(message(), "Hello there, this is a real message.");
    await user.click(submit());
    await waitFor(() => expect(name()).not.toHaveAttribute("aria-invalid"));
  });

  it("has no obvious axe violations in the default state", async () => {
    const { container } = renderContact();
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it("has no obvious axe violations in the error state", async () => {
    const user = userEvent.setup();
    const { container, submit } = renderContact();
    await user.click(submit());
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
