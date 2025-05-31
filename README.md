# [akhilaariyachandra.com](https://akhilaariyachandra.com/)

[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

This site is built with [Next.js](https://nextjs.org/), [Tailwind CSS](https://tailwindcss.com/), [Content Collections](https://www.content-collections.dev/), [Turso](https://turso.tech/), [Drizzle ORM](https://github.com/drizzle-team/drizzle-orm), & [Vercel](https://vercel.com/home).

## Environment Variables

|            Name            | Description                                 |
| :------------------------: | ------------------------------------------- |
|       `DATABASE_URL`       | [Turso](https://turso.tech/) database URL   |
|   `DATABASE_AUTH_TOKEN`    | [Turso](https://turso.tech/) database token |
|  `UPSTASH_REDIS_REST_URL`  | [Upstash](https://upstash.com/)             |
| `UPSTASH_REDIS_REST_TOKEN` | [Upstash](https://upstash.com/)             |

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
