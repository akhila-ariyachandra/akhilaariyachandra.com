import { career } from "@/_lib/data";

const CurrentJob = ({
  type,
}: {
  type: "position-indefinite-article" | "position" | "company";
}) => {
  const job = career[0];

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
    <a href={job.company.url} target="_blank" rel="noopener noreferrer">
      {job.company.name}
    </a>
  );
};

export default CurrentJob;
