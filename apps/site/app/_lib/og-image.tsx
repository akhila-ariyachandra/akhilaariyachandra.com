import { ImageResponse } from "next/og";
import { PRODUCTION_URL } from "./constants";

export const getOgImage = async ({
  title,
  pathname,
}: {
  title: string;
  pathname: string;
}) => {
  return new ImageResponse(
    <div
      tw="flex h-full w-full flex-col justify-between bg-zinc-900 p-8"
      style={{ gap: "1rem" }}
    >
      <h1 tw="text-8xl leading-none text-zinc-100">{title}</h1>

      <div tw="flex shrink-0 flex-row items-end" style={{ gap: "1rem" }}>
        <p tw="flex-1 text-3xl text-green-500">
          akhilaariyachandra.com{pathname}
        </p>

        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`${PRODUCTION_URL}/profile-pic.jpg`}
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
