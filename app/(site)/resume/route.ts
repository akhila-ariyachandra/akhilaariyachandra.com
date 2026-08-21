import { client } from "@/sanity/lib/client";
import { RESUME_QUERY } from "@/sanity/lib/queries";

const RESUME_FILENAME = "Akhila_Heshan_Ariyachandra_Resume.pdf";

export const GET = async () => {
  const data = await client.fetch(
    RESUME_QUERY,
    {},
    {
      perspective: "published",
      stega: false,
      next: { revalidate: 0 },
    },
  );

  if (!data?.url) {
    return new Response("Resume not found", {
      status: 404,
      headers: {
        "X-Robots-Tag": "noindex, nofollow",
      },
    });
  }

  const response = await fetch(data.url, { cache: "no-store" });

  if (!response.ok) {
    return new Response("Resume not found", {
      status: 404,
      headers: {
        "X-Robots-Tag": "noindex, nofollow",
      },
    });
  }

  return new Response(response.body, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="${RESUME_FILENAME}"`,
      "X-Robots-Tag": "noindex, nofollow",
    },
  });
};
