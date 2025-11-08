import { ImageResponse } from "next/og";

export const getBaseURL = () => {
  if (typeof window !== "undefined") {
    return "";
  }

  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  }

  return "http://localhost:3000";
};

export const getOgImage = ({
  title,
  pathname,
}: {
  title: string;
  pathname: string;
}) => {
  return new ImageResponse(
    (
      <div tw="flex h-full w-full flex-col justify-between gap-4 bg-zinc-900 p-8">
        <h1 tw="text-8xl leading-none text-zinc-100">{title}</h1>

        <div tw="flex shrink-0 flex-row items-end gap-4">
          <p tw="flex-1 text-3xl text-green-500">
            akhilaariyachandra.com{pathname}
          </p>

          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`${getBaseURL()}/profile-pic.jpg`}
            alt="Akhila Ariyachandra"
            width={240}
            height={240}
            tw="shrink-0 rounded-xl"
          />
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    },
  );
};
