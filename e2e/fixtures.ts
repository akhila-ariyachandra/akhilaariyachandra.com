import { test as base } from "@playwright/test";

export const test = base.extend({
  page: async ({ page }, use) => {
    await page.route("**://*.google-analytics.com/**", (route) =>
      route.abort(),
    );
    await page.route("**://*.googletagmanager.com/**", (route) =>
      route.abort(),
    );
    await page.route("**://*analytics.google.com/**", (route) => route.abort());
    await page.route("**/_vercel/insights/**", (route) => route.abort());
    await page.route("**/_vercel/speed-insights/**", (route) => route.abort());

    // eslint-disable-next-line @eslint-react/rules-of-hooks
    await use(page);
  },
});

export { expect } from "@playwright/test";
