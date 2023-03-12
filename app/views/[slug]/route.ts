import { type NextRequest, NextResponse } from "next/server";
import { eq } from "drizzle-orm/expressions";
import { db, views } from "@/db/schema";

export const dynamic = "force-dynamic";

export const config = {
  runtime: "edge",
};

interface Options {
  params: {
    slug: string;
  };
}

const getView = async (slug: string) => {
  const result = await db.select().from(views).where(eq(views.slug, slug));

  if (result.length === 0) {
    return null;
  }

  return result[0];
};

export const GET = async (request: NextRequest, { params }: Options) => {
  const slug = params.slug;

  const view = await getView(slug);

  if (!view) {
    return NextResponse.json(
      {
        slug,
        count: 0,
      },
      {
        status: 400,
      }
    );
  }

  return NextResponse.json(view);
};

export const POST = async (request: NextRequest, { params }: Options) => {
  const slug = params.slug;

  let view = await getView(slug);

  if (!view) {
    await db.insert(views).values({ slug });
  } else {
    await db
      .update(views)
      .set({ count: view.count + 1 })
      .where(eq(views.slug, slug));
  }

  view = await getView(slug);

  return NextResponse.json(view);
};
