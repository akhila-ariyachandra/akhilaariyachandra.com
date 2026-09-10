import { instant } from "@next/playwright";
import { expect, test } from "@playwright/test";

const assertHref: (href: string | null) => asserts href is string = (
  href,
) => {
  expect(href).toBeTruthy();
};

test.describe("Home page (/)", () => {
  test("is instant on an initial page load", async ({ page, baseURL }) => {
    await instant(
      page,
      async () => {
        await page.goto("/");
        await expect(
          page.getByRole("heading", {
            level: 1,
            name: "Hi, I'm Akhila Ariyachandra",
          }),
        ).toBeVisible();
      },
      {
        baseURL,
      },
    );
  });

  test("is instant on a client navigation", async ({ page }) => {
    await page.goto("/blog");

    await instant(page, async () => {
      await page
        .getByRole("navigation")
        .getByRole("link", { name: "Home" })
        .click();
      await page.waitForURL((url) => url.pathname === "/");
      await expect(
        page.getByRole("heading", {
          level: 1,
          name: "Hi, I'm Akhila Ariyachandra",
        }),
      ).toBeVisible();
    });
  });
});

test.describe("Blog page (/blog)", () => {
  test("is instant on an initial page load", async ({ page, baseURL }) => {
    await instant(
      page,
      async () => {
        await page.goto("/blog");
        await expect(
          page.getByRole("heading", { level: 1, name: "Blog" }),
        ).toBeVisible();
      },
      {
        baseURL,
      },
    );
  });

  test("is instant on a client navigation", async ({ page }) => {
    await page.goto("/");

    await instant(page, async () => {
      await page
        .getByRole("navigation")
        .getByRole("link", { name: "Blog" })
        .click();
      await page.waitForURL((url) => url.pathname === "/blog");
      await expect(
        page.getByRole("heading", { level: 1, name: "Blog" }),
      ).toBeVisible();
    });
  });
});

test.describe("Blog post page (/blog/[slug])", () => {
  test("is instant on an initial page load", async ({ page, baseURL }) => {
    await page.goto("/blog");

    const firstPostLink = page.getByRole("list").getByRole("link").first();
    const title = await firstPostLink.innerText();
    const href = await firstPostLink.getAttribute("href");
    assertHref(href);

    await instant(
      page,
      async () => {
        await page.goto(href);
        await expect(
          page.getByRole("heading", { level: 1, name: title }),
        ).toBeVisible();
      },
      {
        baseURL,
      },
    );
  });

  test("is instant on a client navigation", async ({ page }) => {
    await page.goto("/blog");

    const firstPostLink = page.getByRole("list").getByRole("link").first();
    const title = await firstPostLink.innerText();
    const href = await firstPostLink.getAttribute("href");
    assertHref(href);

    await instant(page, async () => {
      await firstPostLink.click();
      await page.waitForURL((url) => url.pathname === href);
      await expect(
        page.getByRole("heading", { level: 1, name: title }),
      ).toBeVisible();
    });
  });
});
