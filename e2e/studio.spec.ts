import { expect, test } from "./fixtures";

test.describe("Studio (/studio)", () => {
  test("renders styled-components without console errors", async ({ page }) => {
    const consoleErrors: string[] = [];
    const pageErrors: string[] = [];

    page.on("console", (message) => {
      if (message.type() === "error") {
        consoleErrors.push(message.text());
      }
    });
    page.on("pageerror", (error) => {
      pageErrors.push(error.message);
    });

    await page.goto("/studio");

    await expect(page.getByText("Choose login provider")).toBeVisible();

    // styled-components tags every stylesheet it injects with `data-styled`;
    // its absence means CSS-in-JS silently failed to initialize.
    await expect(page.locator("style[data-styled]").first()).toBeAttached();

    expect(pageErrors).toEqual([]);
    expect(consoleErrors).toEqual([]);
  });

  test("shows the available login providers", async ({ page }) => {
    await page.goto("/studio");

    await expect(page.getByRole("link", { name: "Google" })).toBeVisible();
    await expect(page.getByRole("link", { name: "GitHub" })).toBeVisible();
    await expect(
      page.getByRole("link", { name: "E-mail / password" }),
    ).toBeVisible();
  });
});
