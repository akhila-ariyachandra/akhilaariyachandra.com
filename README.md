# [akhilaariyachandra.com](https://akhilaariyachandra.com/)

[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

This site is built with [Next.js](https://nextjs.org/), [Tailwind CSS](https://tailwindcss.com/), [TanStack Query](https://tanstack.com/query/latest), [PlanetScale](https://planetscale.com/), [Drizzle ORM](https://github.com/drizzle-team/drizzle-orm), & [Vercel](https://vercel.com/home).

## Environment Variables

|            Name            | Description                                                                                                                                                                                                                                                                                                                               |
| :------------------------: | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|    `SPOTIFY_CLIENT_ID`     | [Spotify](https://developer.spotify.com/) Client ID                                                                                                                                                                                                                                                                                       |
|  `SPOTIFY_CLIENT_SECRET`   | [Spotify](https://developer.spotify.com/) Client Secret                                                                                                                                                                                                                                                                                   |
|  `SPOTIFY_REFRESH_TOKEN`   | Refresh Token used to make requests ([Guide](https://leerob.io/blog/spotify-api-nextjs))                                                                                                                                                                                                                                                  |
|       `DEV_API_KEY`        | [API Key](https://docs.forem.com/api/#section/Authentication/api_key) needed for [DEV API](https://docs.forem.com/api/)                                                                                                                                                                                                                   |
|      `DATABASE_HOST`       | Host for [PlanetScale serverless driver for JavaScript](https://planetscale.com/docs/tutorials/planetscale-serverless-driver)                                                                                                                                                                                                             |
|    `DATABASE_USERNAME`     | Username for [PlanetScale serverless driver for JavaScript](https://planetscale.com/docs/tutorials/planetscale-serverless-driver)                                                                                                                                                                                                         |
|    `DATABASE_PASSWORD`     | Password for [PlanetScale serverless driver for JavaScript](https://planetscale.com/docs/tutorials/planetscale-serverless-driver)                                                                                                                                                                                                         |
|       `DATABASE_URL`       | [PlanetScale](https://planetscale.com/) database connection URL. Used only for schema changes. Only used for schema changes with [Drizzle Kit](https://orm.drizzle.team/kit-docs/overview). Replace `?sslaccept=strict` with `?ssl={"rejectUnauthorized":true}` in string ([link](https://orm.drizzle.team/kit-docs/conf#push-and-pull)). |
|  `UPSTASH_REDIS_REST_URL`  | [Upstash](https://upstash.com/)                                                                                                                                                                                                                                                                                                           |
| `UPSTASH_REDIS_REST_TOKEN` | [Upstash](https://upstash.com/)                                                                                                                                                                                                                                                                                                           |
|      `RESEND_API_KEY`      | API Key for [Resend](https://resend.com/home)                                                                                                                                                                                                                                                                                             |
|         `TO_EMAIL`         | Email address of the receiver                                                                                                                                                                                                                                                                                                             |
|        `GITHUB_ID`         | Client ID from [GitHub OAuth app](https://docs.github.com/en/apps/oauth-apps/building-oauth-apps/creating-an-oauth-app)                                                                                                                                                                                                                   |
|      `GITHUB_SECRET`       | Client secret from [GitHub OAuth app](https://docs.github.com/en/apps/oauth-apps/building-oauth-apps/creating-an-oauth-app)                                                                                                                                                                                                               |
|       `NEXTAUTH_URL`       | Base URL of the site for [NextAuth.js](https://next-auth.js.org/)                                                                                                                                                                                                                                                                         |
|     `NEXTAUTH_SECRET`      | Secret for the JWTs in [NextAuth.js](https://next-auth.js.org/)                                                                                                                                                                                                                                                                           |

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
pnpm format
```
