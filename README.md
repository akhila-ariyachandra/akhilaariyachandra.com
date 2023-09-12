# [akhilaariyachandra.com](https://akhilaariyachandra.com/)

[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

This site is built with [Next.js](https://nextjs.org/), [Tailwind CSS](https://tailwindcss.com/), [TanStack Query](https://tanstack.com/query/latest), [Contentlayer](https://www.contentlayer.dev), [PlanetScale](https://planetscale.com/), [Drizzle ORM](https://github.com/drizzle-team/drizzle-orm), & [Vercel](https://vercel.com/home).

## Environment Variables

|            Name            | Description                                                                                                                                                                                                                                                                                                                               |
| :------------------------: | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|      `DATABASE_HOST`       | Host for [PlanetScale serverless driver for JavaScript](https://planetscale.com/docs/tutorials/planetscale-serverless-driver)                                                                                                                                                                                                             |
|    `DATABASE_USERNAME`     | Username for [PlanetScale serverless driver for JavaScript](https://planetscale.com/docs/tutorials/planetscale-serverless-driver)                                                                                                                                                                                                         |
|    `DATABASE_PASSWORD`     | Password for [PlanetScale serverless driver for JavaScript](https://planetscale.com/docs/tutorials/planetscale-serverless-driver)                                                                                                                                                                                                         |
|       `DATABASE_URL`       | [PlanetScale](https://planetscale.com/) database connection URL. Used only for schema changes. Only used for schema changes with [Drizzle Kit](https://orm.drizzle.team/kit-docs/overview). Replace `?sslaccept=strict` with `?ssl={"rejectUnauthorized":true}` in string ([link](https://orm.drizzle.team/kit-docs/conf#push-and-pull)). |
|  `UPSTASH_REDIS_REST_URL`  | [Upstash](https://upstash.com/)                                                                                                                                                                                                                                                                                                           |
| `UPSTASH_REDIS_REST_TOKEN` | [Upstash](https://upstash.com/)                                                                                                                                                                                                                                                                                                           |

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
