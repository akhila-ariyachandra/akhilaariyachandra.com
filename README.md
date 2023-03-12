# [akhilaariyachandra.com](https://akhilaariyachandra.com/)

[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

This site is built with [Next.js](https://nextjs.org/), [Tailwind CSS](https://tailwindcss.com/), [PlanetScale](https://planetscale.com/), [Drizzle ORM](https://github.com/drizzle-team/drizzle-orm), & [Vercel](https://vercel.com/home).

## Environment Variables

|            Name            | Description                                                                                                                       |
| :------------------------: | --------------------------------------------------------------------------------------------------------------------------------- |
|    `SPOTIFY_CLIENT_ID`     | [Spotify](https://developer.spotify.com/) Client ID                                                                               |
|  `SPOTIFY_CLIENT_SECRET`   | [Spotify](https://developer.spotify.com/) Client Secret                                                                           |
|  `SPOTIFY_REFRESH_TOKEN`   | Refresh Token used to make requests ([Guide](https://leerob.io/blog/spotify-api-nextjs))                                          |
|       `DEV_API_KEY`        | [API Key](https://docs.forem.com/api/#section/Authentication/api_key) needed for [DEV API](https://docs.forem.com/api/)           |
|      `DATABASE_HOST`       | Host for [PlanetScale serverless driver for JavaScript](https://planetscale.com/docs/tutorials/planetscale-serverless-driver)     |
|    `DATABASE_USERNAME`     | Username for [PlanetScale serverless driver for JavaScript](https://planetscale.com/docs/tutorials/planetscale-serverless-driver) |
|    `DATABASE_PASSWORD`     | Password for [PlanetScale serverless driver for JavaScript](https://planetscale.com/docs/tutorials/planetscale-serverless-driver) |
|  `UPSTASH_REDIS_REST_URL`  | [Upstash](https://upstash.com/)                                                                                                   |
| `UPSTASH_REDIS_REST_TOKEN` | [Upstash](https://upstash.com/)                                                                                                   |

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
