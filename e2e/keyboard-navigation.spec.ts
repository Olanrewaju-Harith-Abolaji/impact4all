import { test, expect, Page } from "@playwright/test";

/**
 * Keyboard-only navigation e2e tests.
 *
 * These tests never touch the mouse — they simulate a keyboard-only user
 * exercising the navbar, mobile hamburger menu, skip-link, and interactive
 * elements on key pages.
 */

async function focusedTextContent(page: Page): Promise<string> {
  return await page.evaluate(() =>
    (document.activeElement?.textContent || "").trim().slice(0, 80),
  );
}

async function focusedTag(page: Page): Promise<string> {
  return await page.evaluate(() => document.activeElement?.tagName.toLowerCase() || "");
}

test.describe("Keyboard-only navigation", () => {
  test("skip-to-content link is the first tab stop and jumps to <main>", async ({ page }) => {
    await page.goto("/");
    await page.keyboard.press("Tab");
    const label = await focusedTextContent(page);
    expect(label.toLowerCase()).toContain("skip to main content");
    await page.keyboard.press("Enter");
    const focusedId = await page.evaluate(() => document.activeElement?.id);
    expect(focusedId).toBe("main-content");
  });

  test("Tab reaches the brand link and all top-level nav links on desktop", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto("/");
    // Skip past the skip-link
    await page.keyboard.press("Tab");
    // Brand link "Harith."
    await page.keyboard.press("Tab");
    const brand = await focusedTextContent(page);
    expect(brand).toMatch(/Harith/);

    // Walk forward through several nav items; each should be an anchor
    for (let i = 0; i < 5; i++) {
      await page.keyboard.press("Tab");
      const tag = await focusedTag(page);
      expect(["a", "button"]).toContain(tag);
    }
  });

  test("Enter on a nav link navigates the route", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto("/");
    const contactLink = page.getByRole("link", { name: /^contact$/i }).first();
    await contactLink.focus();
    await page.keyboard.press("Enter");
    await expect(page).toHaveURL(/\/contact$/);
    // Main should receive focus after route change
    const focusedId = await page.evaluate(() => document.activeElement?.id);
    expect(focusedId).toBe("main-content");
  });
});

test.describe("Mobile hamburger menu — keyboard flow", () => {
  test.use({ viewport: { width: 390, height: 844 } });

  test("Enter opens the menu, Escape closes it and restores focus to toggle", async ({ page }) => {
    await page.goto("/");
    const toggle = page.getByRole("button", { name: /open menu/i });
    await toggle.focus();
    await page.keyboard.press("Enter");

    const dialog = page.getByRole("dialog", { name: /mobile navigation/i });
    await expect(dialog).toBeVisible();
    await expect(dialog).toHaveAttribute("aria-modal", "true");

    // Focus should move into the dialog
    const inside = await page.evaluate(() => {
      const d = document.getElementById("mobile-menu");
      return d?.contains(document.activeElement);
    });
    expect(inside).toBe(true);

    // Escape closes and restores focus to the toggle
    await page.keyboard.press("Escape");
    await expect(dialog).toHaveCount(0);
    const restored = await page.evaluate(() =>
      document.activeElement?.getAttribute("aria-controls"),
    );
    expect(restored).toBe("mobile-menu");
  });

  test("Tab wraps focus inside the open mobile menu", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("button", { name: /open menu/i }).click();
    const dialog = page.getByRole("dialog");
    await expect(dialog).toBeVisible();

    // Cycle Tab many times; focus must never leave the dialog
    for (let i = 0; i < 20; i++) {
      await page.keyboard.press("Tab");
      const inside = await page.evaluate(() => {
        const d = document.getElementById("mobile-menu");
        return d?.contains(document.activeElement);
      });
      expect(inside).toBe(true);
    }
  });

  test("Shift+Tab also stays trapped in the dialog", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("button", { name: /open menu/i }).click();
    await expect(page.getByRole("dialog")).toBeVisible();
    for (let i = 0; i < 20; i++) {
      await page.keyboard.press("Shift+Tab");
      const inside = await page.evaluate(() => {
        const d = document.getElementById("mobile-menu");
        return d?.contains(document.activeElement);
      });
      expect(inside).toBe(true);
    }
  });
});

test.describe("Contact page — form keyboard flow", () => {
  test("submitting an empty form moves focus to the first invalid field", async ({ page }) => {
    await page.goto("/contact");
    const submit = page.getByRole("button", { name: /send message/i });
    await submit.focus();
    await page.keyboard.press("Enter");
    const focusedId = await page.evaluate(() => document.activeElement?.id);
    expect(focusedId).toBe("name");
    // Error region is announced
    await expect(page.getByText(/please enter your name/i)).toBeVisible();
  });

  test("Tab order flows name → email → message → submit", async ({ page }) => {
    await page.goto("/contact");
    await page.getByLabel(/name/i).focus();
    await expect(page.getByLabel(/name/i)).toBeFocused();
    await page.keyboard.press("Tab");
    await expect(page.getByLabel(/email/i)).toBeFocused();
    await page.keyboard.press("Tab");
    await expect(page.getByLabel(/message/i)).toBeFocused();
    await page.keyboard.press("Tab");
    await expect(page.getByRole("button", { name: /send message/i })).toBeFocused();
  });
});
