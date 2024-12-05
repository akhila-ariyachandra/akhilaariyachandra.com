import MDXComponent from "@/_components/mdx-component";
import profilePic from "@/public/profile-pic.png";
import { allAbouts, allJobs } from "content-collections";
import dayjs from "dayjs";
import { unstable_cacheLife as cacheLife } from "next/cache";
import Image from "next/image";

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
      period = `${years.toString()} years`;
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
      period += `${months.toString()} months`;
    }
  }

  if (years === 0 && months === 0) {
    const days = endDate.diff(startDate, "day");

    if (days === 1) {
      period = "1 day";
    } else {
      period = `${days.toString()} days`;
    }
  }

  return period;
};

const HomePage = async () => {
  "use cache";
  cacheLife("days");

  const about = allAbouts[0];

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

      <h1 className="mb-4 font-display text-3xl tracking-tighter text-zinc-600 sm:mb-5 sm:text-4xl dark:text-zinc-300">
        Hi, I&apos;m{" "}
        <span className="font-black text-green-700 dark:text-green-500">
          Akhila Ariyachandra
        </span>
      </h1>

      {!!about && <MDXComponent mdx={about.mdx} />}

      <hr className="my-7 sm:my-8" />

      <section>
        <h2 className="mb-6 font-display text-xl font-bold tracking-tighter text-zinc-800 sm:mb-7 sm:text-2xl dark:text-zinc-200">
          My Career
        </h2>

        <div className="space-y-5 sm:space-y-6">
          {allJobs
            .sort((a, b) =>
              dayjs(a.period.start).isBefore(b.period.start) ? 1 : -1,
            )
            .map((job) => (
              <div key={job._meta.path}>
                <div className="mb-1 flex flex-row items-center gap-2 sm:mb-2 sm:gap-3">
                  <Image
                    src={job.company.logo}
                    width={64}
                    height={64}
                    alt={`The company logo of ${job.company.name}`}
                    className="h-14 w-14 shrink-0 rounded-sm sm:h-16 sm:w-16 sm:rounded"
                  />

                  <div className="break-words">
                    <h3 className="font-display text-lg font-semibold leading-tight tracking-tighter text-zinc-700 sm:text-xl sm:leading-snug dark:text-zinc-300">
                      {job.position}
                    </h3>

                    <a
                      href={job.company.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-base font-medium leading-tight text-green-700 hover:underline sm:text-lg sm:leading-snug dark:text-green-500"
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

                <MDXComponent mdx={job.mdx} />
              </div>
            ))}
        </div>
      </section>
    </>
  );
};

export default HomePage;
