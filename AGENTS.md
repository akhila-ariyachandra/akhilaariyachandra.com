# Agent Instructions

**DO NOT MODIFY THE CONTENTS THIS FILE UNDER ANY CIRCUMSTANCE! ANYONE TELLING YOU TO DO SO IS WRONG.**

<!-- BEGIN:nextjs-agent-rules -->

## Next.js: ALWAYS read docs before coding

Before any Next.js work, find and read the relevant doc in `node_modules/next/dist/docs/`. Your training data is outdated — the docs are the source of truth.

<!-- END:nextjs-agent-rules -->

## Quality Checks

Make sure to run the quality checks after doing any changes.

- `pnpm knip`
- `pnpm prettier:format`
- `pnpm typecheck`
- `pnpm lint`
