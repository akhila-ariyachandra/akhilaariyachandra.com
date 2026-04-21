import { client } from "@/_lib/sanity/client";
import { CURRENT_JOB_QUERY } from "@repo/cms/queries";
import type { CURRENT_JOB_QUERY_RESULT } from "@repo/cms/types";

const CurrentJob = async ({
  type,
}: {
  type: "position-indefinite-article" | "position" | "company";
}) => {
  if (!client) {
    return null;
  }

  const job = await client.fetch<CURRENT_JOB_QUERY_RESULT>(CURRENT_JOB_QUERY);

  if (!job) {
    return null;
  }

  if (type === "position-indefinite-article") {
    if (
      job.position.toLowerCase().startsWith("a") ||
      job.position.toLowerCase().startsWith("e") ||
      job.position.toLowerCase().startsWith("i") ||
      job.position.toLowerCase().startsWith("o") ||
      job.position.toLowerCase().startsWith("u")
    ) {
      return "an";
    }

    return "a";
  }

  if (type === "position") {
    return job.position;
  }

  return (
    <a href={job.employer.url} target="_blank" rel="noopener noreferrer">
      {job.employer.name}
    </a>
  );
};

export default CurrentJob;
