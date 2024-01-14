/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import { ImageResponse } from "next/og";
import "server-only";

export const generateOgImage = async (
  title: string,
  subtitle: string,
  content?: string,
) => {
  const imageData = await fetch(
    new URL("../_assets/profile-pic.png", import.meta.url),
  ).then((res) => res.arrayBuffer());

  return new ImageResponse(
    (
      <div tw="flex relative h-full w-full flex-col p-8 bg-zinc-900 border-8 border-green-600">
        <h1 tw="text-8xl text-zinc-100 my-0">{title}</h1>

        <h2 tw="text-6xl text-zinc-300 my-2">{subtitle}</h2>

        {!!content && <h3 tw="text-4xl text-zinc-400 my-0">{content}</h3>}

        <p tw="text-3xl text-green-500 mt-auto mb-0">akhilaariyachandra.com</p>

        <img
          src={imageData as unknown as string}
          width={240}
          height={240}
          tw="rounded-xl absolute bottom-8 right-8"
        />
      </div>
    ),
    {
      width: 1200,
      height: 630,
    },
  );
};
