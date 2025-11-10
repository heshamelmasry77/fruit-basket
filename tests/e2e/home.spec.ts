import { test, expect } from "@playwright/test";

test("home → CTA leads to /scan", async ({ page }) => {
  await page.goto("/");
  // Button-like link has accessible name "Start Shopping Now"
  const cta = page.getByRole("link", { name: /start shopping now/i });
  await expect(cta).toBeVisible();
  await cta.click();
  await expect(page).toHaveURL(/\/scan$/);
});
