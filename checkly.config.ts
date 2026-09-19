import { defineConfig } from "checkly";
import { Engine, Frequency } from "checkly/constructs";

const config = defineConfig({
  logicalId: "akhilaariyachandra.com",
  projectName: "akhilaariyachandra.com",
  checks: {
    playwrightConfigPath: "./playwright.config.ts",
    playwrightChecks: [
      {
        logicalId: "e2e",
        name: "E2E Tests",
        testCommand: "pnpm playwright test",
        /* Checkly defaults to Node 22, whose bundled corepack resolves pnpm at
           bin/pnpm.cjs - a path pnpm 12 no longer ships, so the install fails.
           Node 24 ships a corepack that reads the bin field instead. */
        engine: Engine.node("24"),
        /* No `pwProjects`, so every project in playwright.config.ts runs -
           chromium, firefox and webkit. */

        /* This suite exists to gate Vercel deployments, which the Vercel
           integration triggers directly. A deployed check still needs a
           schedule, so it is pinned to the slowest one available. */
        frequency: Frequency.EVERY_24H,
        locations: ["eu-central-1"],
      },
    ],
  },
  cli: {
    runLocation: "eu-central-1",
  },
});

export default config;
