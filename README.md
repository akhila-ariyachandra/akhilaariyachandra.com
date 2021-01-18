# [akhilaariyachandra.com](https://akhilaariyachandra.com/)

[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

This site is built with [Next.js](https://nextjs.org/), [Tailwind CSS](https://tailwindcss.com/), & [Vercel](https://vercel.com/home).

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

|               Name                | Description                                                                                                                                                                     |
| :-------------------------------: | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `NEXT_PUBLIC_ILP_PAYMENT_POINTER` | [Web Monetization](https://webmonetization.org/) Payment Pointer                                                                                                                |
|        `FAUNA_SECRET_KEY`         | [FaunaDB](https://fauna.com/) secret key ([FaunaDB Setup](https://joshwcomeau.com/react/serverless-hit-counter/#getting-set-up-with-fauna "Building a Modern-Day Hit Counter")) |
|    Firebase related variables     | Check [web](./src/lib/firebase.ts) and [admin](./src/lib/firebaseAdmin.ts)                                                                                                      |

## Analytics

This site uses [Splitbee](https://splitbee.io/).
