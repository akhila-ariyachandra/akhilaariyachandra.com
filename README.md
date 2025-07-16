# [akhilaariyachandra.com](https://akhilaariyachandra.com/)

[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

This site is built with [Next.js](https://nextjs.org/), [Tailwind CSS](https://tailwindcss.com/), [Content Collections](https://www.content-collections.dev/), [Prisma Postgres](https://www.prisma.io/postgres), [Prisma ORM](https://www.prisma.io/orm), & [Vercel](https://vercel.com/home).

## Environment Variables

|            Name            | Description                                                    |
| :------------------------: | -------------------------------------------------------------- |
|       `DATABASE_URL`       | [Prisma Postgres](https://www.prisma.io/postgres) database URL |
|  `UPSTASH_REDIS_REST_URL`  | [Upstash](https://upstash.com/)                                |
| `UPSTASH_REDIS_REST_TOKEN` | [Upstash](https://upstash.com/)                                |

## Actions

### Running in development mode

```shell
bun run dev
```

### Running in production mode

```shell
bun run build
bun run start
```

### Formatting the code

```shell
bun run prettier:format
```
