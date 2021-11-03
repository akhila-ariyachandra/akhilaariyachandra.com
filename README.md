# [akhilaariyachandra.com](https://akhilaariyachandra.com/)

[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

This site is built with [Next.js](https://nextjs.org/), [Tailwind CSS](https://tailwindcss.com/), [PlanetScale](https://planetscale.com/), & [Vercel](https://vercel.com/home).

## Actions

### Running in development mode

```shell
yarn dev
```

### Running in production mode

```shell
yarn build
yarn start
```

### Formatting the code

```shell
yarn format
```

## Environment Variables

|               Name                | Description                                                                                                                 |
| :-------------------------------: | --------------------------------------------------------------------------------------------------------------------------- |
| `NEXT_PUBLIC_ILP_PAYMENT_POINTER` | [Web Monetization](https://webmonetization.org/) Payment Pointer                                                            |
|        `SPOTIFY_CLIENT_ID`        | The [Spotify](https://developer.spotify.com/) Client ID                                                                     |
|      `SPOTIFY_CLIENT_SECRET`      | The [Spotify](https://developer.spotify.com/) Client Secret                                                                 |
|      `SPOTIFY_REFRESH_TOKEN`      | The Refresh Token used to make requests ([Guide](https://leerob.io/blog/spotify-api-nextjs))                                |
|           `DEV_API_KEY`           | The [API Key](https://docs.forem.com/api/#section/Authentication/api_key) needed for [DEV API](https://docs.forem.com/api/) |
|          `DATABASE_URL`           | The PlanetScale database URL ([Guide](https://davidparks.dev/blog/planetscale-deployment-with-prisma/))                     |
|       `SHADOW_DATABASE_URL`       | The PlanetScale shadow database URL used for migrations                                                                     |

## Analytics

This site uses [Splitbee](https://splitbee.io/).

## [PlanetScale](https://planetscale.com/)

Use [this guide](https://davidparks.dev/blog/planetscale-deployment-with-prisma/) to setup PlanetScale.

### Creating development and shadow branches

```shell
pscale branch create "Database Name" development
pscale branch create "Database Name" shadow
```

### Running the development branch locally

```shell
pscale connect "Database Name" development--port 3309
```

#### Connecting to the main branch locally

```shell
pscale connect "Database Name" development --port 3309
```

## [Prisma](https://www.prisma.io/)

### Create a migration

Run the `development` and `shadow` branches locally in separate terminals.

```shell
pscale connect "Database Name" development --port 3309
```

```shell
pscale connect "Database Name" shadow --port 3310
```

Then run Prisma Migrate.

```shell
yarn prisma:migrate
```

After the migration is complete, create a deploy request to bring changes to the `main` branch.

```shell
pscale deploy-request create "Database Name" development
```

### Generate Prisma Client

```shell
yarn prisma:generate
```
