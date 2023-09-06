import dayjs from "dayjs";
import profilePic from "@/public/profile-pic.png";
import Image from "next/image";
import MDXComponent from "@/components/MDXComponent";
import { about, allJobs } from ".contentlayer/generated";

const getPeriod = (start: string, end?: string) => {
  const startDate = dayjs(start);
  const endDate = dayjs(end);

  const years = endDate.diff(startDate, "year");
  const months = endDate.diff(startDate, "month") - years * 12;

  let period = "";

  if (years > 0) {
    if (years === 1) {
      period = "1 year";
    } else {
      period = `${years} years`;
    }
  }

  if (months > 0) {
    if (period) {
      period += ", ";
    } else {
      period = "";
    }

    if (months === 1) {
      period += "1 month";
    } else {
      period += `${months} months`;
    }
  }

  if (years === 0 && months === 0) {
    const days = endDate.diff(startDate, "day");

    if (days === 1) {
      period = `${days} day`;
    } else {
      period = `${days} days`;
    }
  }

  return period;
};

const HomePage = () => {
  return (
    <>
      <Image
        src={profilePic}
        width={240}
        height={240}
        alt="A picture of Akhila Ariyachandra"
        className="mb-4 w-44 rounded sm:float-left sm:mb-5 sm:mr-5 sm:w-60 sm:rounded-lg"
        placeholder="blur"
      />

      <h1 className="mb-4 font-display text-3xl text-zinc-600 dark:text-zinc-300 sm:mb-5 sm:text-4xl">
        Hi, I&apos;m{" "}
        <span className="font-black text-green-700 dark:text-green-500">
          Akhila Ariyachandra
        </span>
      </h1>

      <MDXComponent code={about.body.code} />

      <hr className="my-3 sm:my-4" />

      <section>
        <h2 className="mb-4 font-display text-xl font-bold text-zinc-800 dark:text-zinc-200 sm:mb-5 sm:text-2xl">
          My Career
        </h2>

        <div className="space-y-3 sm:space-y-4">
          {allJobs
            .sort((a, b) =>
              dayjs(a.period.start).isBefore(b.period.start) ? 1 : -1,
            )
            .map((job) => (
              <div key={job._id}>
                <div className="mb-1 flex flex-row items-center gap-1 sm:mb-2 sm:gap-2">
                  <Image
                    src={job.company.logo}
                    width={64}
                    height={64}
                    alt={`The company logo of ${job.company.name}`}
                    className="shrink-0 rounded-sm sm:rounded"
                  />

                  <div className="break-words">
                    <h3 className="font-display text-lg font-semibold leading-tight text-zinc-700 dark:text-zinc-300 sm:text-xl sm:leading-snug">
                      {job.position}
                    </h3>

                    <a
                      href={job.company.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-base font-medium leading-tight text-green-700 hover:underline dark:text-green-500 sm:text-lg sm:leading-snug"
                    >
                      {job.company.name}
                    </a>

                    <div className="text-sm leading-tight sm:text-base sm:leading-snug">
                      <span className="text-zinc-600 dark:text-zinc-400">
                        {`${dayjs(job.period.start).format("MMMM YYYY")} - ${
                          job.period.end
                            ? dayjs(job.period.end).format("MMMM YYYY")
                            : "Present"
                        }`}
                      </span>
                      <span className="font-light text-zinc-500 dark:text-zinc-400">
                        {` (${getPeriod(
                          job.period.start.toString(),
                          job.period.end
                            ? job.period.end.toString()
                            : undefined,
                        )})`}
                      </span>
                    </div>
                  </div>
                </div>

                <MDXComponent code={job.body.code} />
              </div>
            ))}
        </div>
      </section>
    </>
  );
};

export default HomePage;
