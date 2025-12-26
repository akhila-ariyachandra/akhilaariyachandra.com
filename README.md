# [akhilaariyachandra.com](https://akhilaariyachandra.com/)

[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

This site is built with [Next.js](https://nextjs.org/), [Tailwind CSS](https://tailwindcss.com/), [Content Collections](https://www.content-collections.dev/), [PostgreSQL](https://www.postgresql.org/), [Drizzle ORM](https://orm.drizzle.team/), & [Vercel](https://vercel.com/home).

## Environment Variables

|              Name              | Description                                                                                                                                                                                  |
| :----------------------------: | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|         `DATABASE_URL`         | [PostgreSQL](https://www.postgresql.org/) database URL                                                                                                                                       |
|    `UPSTASH_REDIS_REST_URL`    | [Upstash](https://upstash.com/)                                                                                                                                                              |
|   `UPSTASH_REDIS_REST_TOKEN`   | [Upstash](https://upstash.com/)                                                                                                                                                              |
| `ENABLE_EXPERIMENTAL_COREPACK` | Set to `1` to enable [Corepack in Vercel](https://vercel.com/docs/builds/configure-a-build#corepack)                                                                                         |
|      `SPOTIFY_CLIENT_ID`       | [Spotify Web App](https://developer.spotify.com/documentation/web-api/concepts/apps) Client ID                                                                                               |
|    `SPOTIFY_CLIENT_SECRET`     | [Spotify Web App](https://developer.spotify.com/documentation/web-api/concepts/apps) Client Secret                                                                                           |
|    `SPOTIFY_REFRESH_TOKEN`     | The refresh token used to get a new access token for the Spotify API. Follow this [link](https://web.archive.org/web/20210724044853/https://leerob.io/blog/spotify-api-nextjs) to set it up. |

## Actions

### Running in development mode

```shell
pnpm run dev
```

### Running in production mode

```shell
pnpm run build
pnpm run start
```

### Formatting the code

```shell
pnpm run prettier:format
```
