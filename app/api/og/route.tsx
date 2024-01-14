/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import { getBaseURL } from "@/_utils/helpers";
import { ImageResponse } from "next/og";
import { NextResponse, type NextRequest } from "next/server";
import { z } from "zod";

const queryParamSchema = z.object({
  title: z.string(),
  subtitle: z.string(),
  content: z.string().nullable(),
});

export const runtime = "edge";

export const GET = async (request: NextRequest) => {
  const title = request.nextUrl.searchParams.get("title");
  const subtitle = request.nextUrl.searchParams.get("subtitle");
  const content = request.nextUrl.searchParams.get("content");

  try {
    const data = await queryParamSchema.parseAsync({
      title,
      subtitle,
      content,
    });

    return new ImageResponse(
      (
        <div tw="flex relative h-full w-full flex-col p-8 bg-zinc-900 border-8 border-green-600">
          <h1 tw="text-8xl text-zinc-100 my-0">{data.title}</h1>

          <h2 tw="text-6xl text-zinc-300 my-2">{data.subtitle}</h2>

          {!!data.content && (
            <h3 tw="text-4xl text-zinc-400 my-0">{data.content}</h3>
          )}

          <p tw="text-3xl text-green-500 mt-auto mb-0">
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
      },
    );
  } catch (error) {
    return NextResponse.json(error, { status: 400 });
  }
};
