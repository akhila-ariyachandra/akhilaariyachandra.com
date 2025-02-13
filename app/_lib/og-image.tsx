import { ImageResponse } from "next/og";

export const getBaseURL = () => {
  if (typeof window !== "undefined") {
    return "";
  }

  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }

  return "http://localhost:3000";
};

export const getOgImage = (
  title: string,
  subtitle: string,
  content?: string,
) => {
  return new ImageResponse(
    (
      <div tw="relative flex h-full w-full flex-col border-8 border-green-600 bg-zinc-900 p-8">
        <h1 tw="my-0 text-8xl text-zinc-100">{title}</h1>

        <h2 tw="my-2 text-6xl text-zinc-300">{subtitle}</h2>

        {!!content && <h3 tw="my-0 text-4xl text-zinc-400">{content}</h3>}

        <p tw="mt-auto mb-0 text-3xl text-green-500">akhilaariyachandra.com</p>

        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`${getBaseURL()}/profile-pic.png`}
          alt="Akhila Ariyachandra"
          width={240}
          height={240}
          tw="absolute right-8 bottom-8 rounded-xl"
        />
      </div>
    ),
    {
      width: 1200,
      height: 630,
    },
  );
};
