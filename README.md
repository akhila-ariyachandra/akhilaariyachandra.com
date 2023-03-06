# [akhilaariyachandra.com](https://akhilaariyachandra.com/)

[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

This site is built with [Next.js](https://nextjs.org/), [Tailwind CSS](https://tailwindcss.com/), [PlanetScale](https://planetscale.com/), [Prisma](https://www.prisma.io/), & [Vercel](https://vercel.com/home).

## Environment Variables

|          Name           | Description                                                                                                             |
| :---------------------: | ----------------------------------------------------------------------------------------------------------------------- |
|   `SPOTIFY_CLIENT_ID`   | [Spotify](https://developer.spotify.com/) Client ID                                                                     |
| `SPOTIFY_CLIENT_SECRET` | [Spotify](https://developer.spotify.com/) Client Secret                                                                 |
| `SPOTIFY_REFRESH_TOKEN` | Refresh Token used to make requests ([Guide](https://leerob.io/blog/spotify-api-nextjs))                                |
|      `DEV_API_KEY`      | [API Key](https://docs.forem.com/api/#section/Authentication/api_key) needed for [DEV API](https://docs.forem.com/api/) |
|     `DATABASE_URL`      | [PlanetScale](https://planetscale.com/) database url                                                                    |

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

## [PlanetScale](https://planetscale.com/)

[Setting up](https://akhilaariyachandra.com/blog/using-planetscale-with-prisma-in-nextjs)

### Running the database locally

```shell
pscale connect akhilaariyachandra-com development --port 3309
```

### Making database schema changes

```shell
pnpm prisma:db-push
```

### Creating a deploy request

```shell
pscale deploy-request create akhilaariyachandra-com development
```
