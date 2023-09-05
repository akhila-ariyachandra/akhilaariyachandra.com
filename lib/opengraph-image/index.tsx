/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import "server-only";

import { ImageResponse } from "next/server";

export const getBaseURL = () => {
  if (typeof window !== "undefined") {
    return "";
  }

  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }

  return "http://localhost:3000";
};

export const getOpenGraphImage = async (
  title: string,
  subtitle: string,
  content?: string,
) => {
  const [
    oswaldBoldFont,
    sourceCodeProRegularFont,
    sourceCodeProMediumFont,
    sourceCodeProSemiBoldFont,
  ] = await Promise.all([
    await fetch(new URL("./Oswald-Bold.ttf", import.meta.url)).then((res) =>
      res.arrayBuffer(),
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
  ]);

  return new ImageResponse(
    (
      <div tw="flex relative h-full w-full flex-col p-8 bg-zinc-900 border-8 border-green-600">
        <h1
          style={{ fontFamily: '"Oswald Bold"' }}
          tw="text-8xl text-zinc-100 my-0"
        >
          {title}
        </h1>

        <h2
          style={{ fontFamily: '"Source Code Pro Semi Bold"' }}
          tw="text-6xl text-zinc-300 my-2"
        >
          {subtitle}
        </h2>

        {!!content && (
          <h3
            style={{ fontFamily: '"Source Code Pro Medium"' }}
            tw="text-4xl text-zinc-400 my-0"
          >
            {content}
          </h3>
        )}

        <p
          style={{ fontFamily: '"Source Code Pro"' }}
          tw="text-3xl text-green-500 mt-auto mb-0"
        >
          akhilaariyachandra.com
        </p>

        <img
          src={`${getBaseURL()}/profile-pic.png`}
          width={240}
          height={240}
          tw="rounded-xl absolute bottom-8 right-8"
        />
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: "Oswald Bold",
          data: oswaldBoldFont,
          style: "normal",
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
      ],
    },
  );
};

export default getOpenGraphImage;
