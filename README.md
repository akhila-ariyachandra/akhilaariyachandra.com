# [akhilaariyachandra.com](https://akhilaariyachandra.com/)

[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

This site is built with [Next.js](https://nextjs.org/), [Tailwind CSS](https://tailwindcss.com/), [Contentlayer](https://www.contentlayer.dev), [Vercel Postgres](https://vercel.com/docs/storage/vercel-postgres), [Drizzle ORM](https://github.com/drizzle-team/drizzle-orm), & [Vercel](https://vercel.com/home).

## Environment Variables

|                Name                 | Description                                                               |
| :---------------------------------: | ------------------------------------------------------------------------- |
|      `UPSTASH_REDIS_REST_URL`       | [Upstash](https://upstash.com/)                                           |
|     `UPSTASH_REDIS_REST_TOKEN`      | [Upstash](https://upstash.com/)                                           |
| `NEXT_PUBLIC_GOOGLE_MEASUREMENT_ID` | [Google Analytics](https://analytics.google.com/analytics) Measurement ID |

## Actions

### Running in development mode

```shell
pnpm dev
```

### Running in production mode

```shell
pnpm build
pnpm start
```

### Formatting the code

```shell
pnpm prettier:format
```
