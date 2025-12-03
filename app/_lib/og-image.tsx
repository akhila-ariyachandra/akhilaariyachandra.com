import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const getOgImage = async ({
  title,
  pathname,
}: {
  title: string;
  pathname: string;
}) => {
  const profilePicData = await readFile(
    join(process.cwd(), "public", "profile-pic.jpg"),
    "base64",
  );
  const profilePicSrc = `data:image/png;base64,${profilePicData}`;

  return new ImageResponse(
    <div tw="flex h-full w-full flex-col justify-between gap-4 bg-zinc-900 p-8">
      <h1 tw="text-8xl leading-none text-zinc-100">{title}</h1>

      <div tw="flex shrink-0 flex-row items-end gap-4">
        <p tw="flex-1 text-3xl text-green-500">
          akhilaariyachandra.com{pathname}
        </p>

        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={profilePicSrc}
          alt="Akhila Ariyachandra"
          width={240}
          height={240}
          tw="shrink-0 rounded-xl"
        />
      </div>
    </div>,
    {
      width: 1200,
      height: 630,
    },
  );
};
