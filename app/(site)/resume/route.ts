import { sanityFetch } from "@/sanity/lib/live";
import { RESUME_QUERY } from "@/sanity/lib/queries";

const getResume = async () => {
  "use cache";

  const { data } = await sanityFetch({
    query: RESUME_QUERY,
    perspective: "published",
    stega: false,
  });

  if (!data?.url) {
    return null;
  }

  const response = await fetch(data.url);

  if (!response.ok) {
    return null;
  }

  const body = await response.arrayBuffer();

  return { body };
};

const RESUME_FILENAME = "Akhila_Heshan_Ariyachandra_Resume.pdf";

export const GET = async () => {
  const resume = await getResume();

  if (!resume) {
    return new Response("Resume not found", {
      status: 404,
      headers: {
        "X-Robots-Tag": "noindex, nofollow",
      },
    });
  }

  return new Response(resume.body, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="${RESUME_FILENAME}"`,
      "X-Robots-Tag": "noindex, nofollow",
    },
  });
};
