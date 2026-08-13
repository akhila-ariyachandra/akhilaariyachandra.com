import { urlFor } from "@/sanity/lib/image";
import { sanityFetchStaticParams } from "@/sanity/lib/live";
import { PERSONAL_INFO_QUERY } from "@/sanity/lib/queries";
import { ImageResponse } from "next/og";

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

        {!!data && ( // eslint-disable-next-line @next/next/no-img-element
          <img
            src={urlFor(data.picture).width(240).height(240).url()}
            alt="Akhila Ariyachandra"
            width={240}
            height={240}
            tw="shrink-0 rounded-xl"
          />
        )}
      </div>
    </div>,
    {
      width: 1200,
      height: 630,
    },
  );
};
