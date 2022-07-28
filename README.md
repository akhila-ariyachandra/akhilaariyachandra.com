# [akhilaariyachandra.com](https://akhilaariyachandra.com/)

[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

This site is built with [Next.js](https://nextjs.org/), [Tailwind CSS](https://tailwindcss.com/), & [Vercel](https://vercel.com/home).

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

## Environment Variables

|          Name           | Description                                                                                                                 |
| :---------------------: | --------------------------------------------------------------------------------------------------------------------------- |
|   `SPOTIFY_CLIENT_ID`   | The [Spotify](https://developer.spotify.com/) Client ID                                                                     |
| `SPOTIFY_CLIENT_SECRET` | The [Spotify](https://developer.spotify.com/) Client Secret                                                                 |
| `SPOTIFY_REFRESH_TOKEN` | The Refresh Token used to make requests ([Guide](https://leerob.io/blog/spotify-api-nextjs))                                |
|      `DEV_API_KEY`      | The [API Key](https://docs.forem.com/api/#section/Authentication/api_key) needed for [DEV API](https://docs.forem.com/api/) |
