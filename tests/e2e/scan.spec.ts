import { test, expect } from "@playwright/test";

test("adding items updates counts and total (offers apply)", async ({ page }) => {
  await page.goto("/scan");

  // Start with zero apples
  const appleCount = page.getByTestId("count-apple");
  await expect(appleCount).toHaveText("0");

  // Add 2 apples => offer "2 for 45" should apply
  await page.getByTestId("add-apple").click();
  await page.getByTestId("add-apple").click();

  await expect(appleCount).toHaveText("2");
  await expect(page.getByTestId("total")).toHaveText("45");

  // Add 1 banana (no offer yet)
  await page.getByTestId("add-banana").click();
  await expect(page.getByTestId("count-banana")).toHaveText("1");
  await expect(page.getByTestId("total")).toHaveText("95"); // 45 + 50

  // Remove one apple => count 1, total 65 (1*30 + 50)
  await page.getByTestId("remove-apple").click();
  await expect(appleCount).toHaveText("1");
  await expect(page.getByTestId("total")).toHaveText("80"); // (1*30) + 50 = 80
});

test("summary shows discount badge when multi-buy saves money", async ({ page }) => {
  await page.goto("/scan");

  // Trigger a discount: 2 apples -> 45 instead of 60
  await page.getByTestId("add-apple").click();
  await page.getByTestId("add-apple").click();

  // Badge should appear for apples
  await expect(page.getByTestId("saved-apple")).toBeVisible();

  // If we reduce to 1 apple, discount badge should go away
  await page.getByTestId("remove-apple").click();
  await expect(page.getByTestId("count-apple")).toHaveText("1");
  await expect(page.getByTestId("total")).toHaveText("30");
  await expect(page.getByTestId("saved-apple")).toHaveCount(0);
});

test("clear resets everything to zero", async ({ page }) => {
  await page.goto("/scan");

  await page.getByTestId("add-kiwi").click();
  await page.getByTestId("add-banana").click();

  await expect(page.getByTestId("count-kiwi")).toHaveText("1");
  await expect(page.getByTestId("count-banana")).toHaveText("1");
  await expect(page.getByTestId("total")).not.toHaveText("0");

  await page.getByRole("button", { name: /clear all items from basket/i }).click();

  await expect(page.getByTestId("count-kiwi")).toHaveText("0");
  await expect(page.getByTestId("count-banana")).toHaveText("0");
  await expect(page.getByTestId("total")).toHaveText("0");
});
