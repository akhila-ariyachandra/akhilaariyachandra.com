import { urlFor } from "@/sanity/lib/image";
import { sanityFetchStaticParams } from "@/sanity/lib/live";
import { PERSONAL_INFO_QUERY } from "@/sanity/lib/queries";
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
  const { data } = await sanityFetchStaticParams({
    query: PERSONAL_INFO_QUERY,
  });

  const [dmSansMedium, dmSansSemiBold, dmSansBold] = await Promise.all([
    readFile(join(process.cwd(), "app/_assets/fonts/DMSans-Medium.ttf")),
    readFile(join(process.cwd(), "app/_assets/fonts/DMSans-SemiBold.ttf")),
    readFile(join(process.cwd(), "app/_assets/fonts/DMSans-Bold.ttf")),
  ]);

  return new ImageResponse(
    <div
      tw="flex h-full w-full p-8"
      style={{
        gap: "1rem",
        backgroundColor: "#dcfce7",
        backgroundImage: "radial-gradient(circle, #a1a1aa 9%, transparent 9%)",
        backgroundSize: "16px 16px",
        fontFamily: "DM Sans, sans-serif",
      }}
    >
      <div
        tw="flex w-full flex-col justify-between rounded border-2 border-black bg-white p-4"
        style={{
          boxShadow: "4px 4px 0px 0px #000000",
        }}
      >
        <h1 tw="text-7xl leading-none font-bold">{title}</h1>

        <div tw="flex shrink-0 flex-row items-end" style={{ gap: "1rem" }}>
          <p tw="flex-1 text-3xl font-medium text-green-700">
            akhilaariyachandra.com{pathname}
          </p>

          {!!data && ( // eslint-disable-next-line @next/next/no-img-element
            <img
              src={urlFor(data.picture).width(240).height(240).url()}
              alt="Akhila Ariyachandra"
              width={240}
              height={240}
              tw="shrink-0 rounded-xl border-2 border-black"
              style={{
                boxShadow: "4px 4px 0px 0px #000000",
              }}
            />
          )}
        </div>
      </div>
    </div>,
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: "DM Sans",
          data: dmSansMedium,
          weight: 500,
          style: "normal",
        },
        {
          name: "DM Sans",
          data: dmSansSemiBold,
          weight: 600,
          style: "normal",
        },
        {
          name: "DM Sans",
          data: dmSansBold,
          weight: 700,
          style: "normal",
        },
      ],
    },
  );
};
