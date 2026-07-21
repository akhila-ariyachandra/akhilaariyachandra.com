# [akhilaariyachandra.com](https://akhilaariyachandra.com/)

[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

This site is built with [Next.js](https://nextjs.org/), [Tailwind CSS](https://tailwindcss.com/), [Content Collections](https://www.content-collections.dev/), & [Vercel](https://vercel.com/home).

## Environment Variables

|              Name              | Description                                                                                          |
| :----------------------------: | ---------------------------------------------------------------------------------------------------- |
| `ENABLE_EXPERIMENTAL_COREPACK` | Set to `1` to enable [Corepack in Vercel](https://vercel.com/docs/builds/configure-a-build#corepack) |
|         `LAST_FM_USER`         | [Last.fm](https://www.last.fm/) username                                                             |
|       `LAST_FM_API_KEY`        | [Last.fm API key](https://www.last.fm/api/authspec)                                                  |

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
