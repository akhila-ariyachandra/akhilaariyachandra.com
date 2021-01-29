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

|               Name                | Description                                                                   |
| :-------------------------------: | ----------------------------------------------------------------------------- |
| `NEXT_PUBLIC_ILP_PAYMENT_POINTER` | [Web Monetization](https://webmonetization.org/) Payment Pointer              |
|    Firebase related variables     | Check [web](./src/lib/firebase.ts) and [admin](./src/lib/firebaseAdmin.ts)    |
|   `NEXT_PUBLIC_UTTERANCES_REPO`   | The GitHub repo to store the comments from [utterances](https://utteranc.es/) |

## Analytics

This site uses [Splitbee](https://splitbee.io/).
