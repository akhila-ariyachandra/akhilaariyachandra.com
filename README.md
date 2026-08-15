# [akhilaariyachandra.com](https://akhilaariyachandra.com/)

[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

This site is built with [Next.js](https://nextjs.org/), [Tailwind CSS](https://tailwindcss.com/), [Sanity](https://www.sanity.io/), & [Vercel](https://vercel.com/home).

## Environment Variables

|               Name                | Description                                                                                          |
| :-------------------------------: | ---------------------------------------------------------------------------------------------------- |
|  `ENABLE_EXPERIMENTAL_COREPACK`   | Set to `1` to enable [Corepack in Vercel](https://vercel.com/docs/builds/configure-a-build#corepack) |
|   `NEXT_PUBLIC_SANITY_DATASET`    | The [Sanity](https://www.sanity.io/) project dataset                                                 |
|  `NEXT_PUBLIC_SANITY_PROJECT_ID`  | The [Sanity](https://www.sanity.io/) project ID                                                      |
|      `SANITY_API_READ_TOKEN`      | A read only token from the [Sanity](https://www.sanity.io/) project for authenticated access         |
|          `LAST_FM_USER`           | [Last.fm](https://www.last.fm/) username                                                             |
|         `LAST_FM_API_KEY`         | [Last.fm API key](https://www.last.fm/api/authspec)                                                  |
| `NEXT_PUBLIC_GOOGLE_ANALYTICS_ID` | [Google Analytics](https://developers.google.com/analytics) ID                                       |

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
