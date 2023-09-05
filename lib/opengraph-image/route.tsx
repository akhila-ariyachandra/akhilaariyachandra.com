/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import { ImageResponse } from "next/server";
import { getBaseURL } from "@/lib/helpers";

export const runtime = "edge";

export const GET = async () => {
  const [
    oswaldRegularFont,
    oswaldLightFont,
    oswaldBoldFont,
    sourceCodeProExtraLightFont,
    sourceCodeProLightFont,
    sourceCodeProRegularFont,
    sourceCodeProMediumFont,
    sourceCodeProSemiBoldFont,
    sourceCodeProBoldFont,
    sourceCodeProBlackFont,
  ] = await Promise.all([
    fetch(new URL("./Oswald-Regular.ttf", import.meta.url)).then((res) =>
      res.arrayBuffer(),
    ),
    await fetch(new URL("./Oswald-Light.ttf", import.meta.url)).then((res) =>
      res.arrayBuffer(),
    ),
    await fetch(new URL("./Oswald-Bold.ttf", import.meta.url)).then((res) =>
      res.arrayBuffer(),
    ),
    await fetch(
      new URL("./SourceCodePro-ExtraLight.ttf", import.meta.url),
    ).then((res) => res.arrayBuffer()),
    await fetch(new URL("./SourceCodePro-Light.ttf", import.meta.url)).then(
      (res) => res.arrayBuffer(),
    ),
    await fetch(new URL("./SourceCodePro-Regular.ttf", import.meta.url)).then(
      (res) => res.arrayBuffer(),
    ),
    await fetch(new URL("./SourceCodePro-Medium.ttf", import.meta.url)).then(
      (res) => res.arrayBuffer(),
    ),
    await fetch(new URL("./SourceCodePro-Semibold.ttf", import.meta.url)).then(
      (res) => res.arrayBuffer(),
    ),
    await fetch(new URL("./SourceCodePro-Bold.ttf", import.meta.url)).then(
      (res) => res.arrayBuffer(),
    ),
    await fetch(new URL("./SourceCodePro-Black.ttf", import.meta.url)).then(
      (res) => res.arrayBuffer(),
    ),
  ]);

  return new ImageResponse(
    (
      <div tw="flex relative h-full w-full flex-col p-4 bg-zinc-900 border-8 border-green-600">
        <h1
          style={{ fontFamily: '"Oswald Bold"' }}
          tw="text-8xl text-zinc-100 my-0"
        >
          Creating a serverless GraphQL API with TypeScript and Prisma
        </h1>

        <h2
          style={{ fontFamily: '"Source Code Pro Semi Bold"' }}
          tw="text-6xl text-zinc-300 my-0"
        >
          Akhila Ariyachandra
        </h2>

        <h3
          style={{ fontFamily: '"Source Code Pro Medium"' }}
          tw="text-4xl text-zinc-400 my-0"
        >
          10th October 1993
        </h3>

        <p
          style={{ fontFamily: '"Source Code Pro"' }}
          tw="text-3xl text-green-500 mt-auto mb-0"
        >
          akhilaariyachandra.com
        </p>

        <img
          src={`${getBaseURL()}/profile-pic.png`}
          width={320}
          height={320}
          tw="rounded-xl absolute bottom-4 right-4"
        />
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: "Oswald",
          data: oswaldRegularFont,
          style: "normal",
        },
        {
          name: "Oswald Light",
          data: oswaldLightFont,
          style: "normal",
        },
        {
          name: "Oswald Bold",
          data: oswaldBoldFont,
          style: "normal",
        },
        {
          name: "Source Code Pro Extra Light",
          data: sourceCodeProExtraLightFont,
          weight: 200,
        },
        {
          name: "Source Code Pro Light",
          data: sourceCodeProLightFont,
          weight: 300,
        },
        {
          name: "Source Code Pro",
          data: sourceCodeProRegularFont,
          weight: 400,
        },
        {
          name: "Source Code Pro Medium",
          data: sourceCodeProMediumFont,
          weight: 500,
        },
        {
          name: "Source Code Pro Semi Bold",
          data: sourceCodeProSemiBoldFont,
          weight: 600,
        },
        {
          name: "Source Code Pro Bold",
          data: sourceCodeProBoldFont,
          weight: 700,
        },
        {
          name: "Source Code Pro Black",
          data: sourceCodeProBlackFont,
          weight: 900,
        },
      ],
    },
  );
};
