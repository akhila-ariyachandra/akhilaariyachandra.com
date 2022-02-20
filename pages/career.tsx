import SEO from "@/components/SEO";
import Image from "next/image";
import ListContainer from "@/components/ListContainer";
import dayjs from "dayjs";
import career from "@/lib/data/career";
import type { NextPage } from "next";
import { getPeriod } from "@/lib/helpers";

const Career: NextPage = () => {
  return (
    <>
      <SEO title="Career" description="My work experience" />

      <div className="mx-auto max-w-xl">
        <ListContainer title="Career">
          {career.map((company) => (
            <div
              key={company.company}
              className="flex flex-row items-center space-x-4"
            >
              <div className="flex-shrink-0">
                <Image
                  src={`/career/${company.image}`}
                  alt={company.company}
                  title={company.company}
                  width={64}
                  height={64}
                  className="rounded-md"
                />
              </div>

              <div className="space-y-3 truncate">
                <div className="flex flex-row space-x-2 truncate text-xl">
                  <a
                    href={company.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="truncate font-sora font-medium text-emerald-700 dark:text-emerald-600"
                  >
                    {company.company}
                  </a>

                  {company.overallPeriod && (
                    <p className="truncate font-sora font-normal text-gray-800 dark:text-gray-200">
                      {`(${getPeriod(
                        company.overallPeriod.startDate,
                        company.overallPeriod.endDate
                      )})`}
                    </p>
                  )}
                </div>

                {company.positions.map((position) => (
                  <div key={position.title} className="space-y-1 truncate">
                    <p className="truncate font-sora text-xl font-semibold text-gray-800 dark:text-gray-200">
                      {position.title}
                    </p>

                    <p className="truncate font-roboto-slab text-base font-normal text-gray-800 dark:text-gray-200">
                      {`${dayjs(position.startDate).format("MMMM YYYY")} - ${
                        position.endDate
                          ? dayjs(position.endDate).format("MMMM YYYY")
                          : "Present"
                      } (${getPeriod(position.startDate, position.endDate)})`}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </ListContainer>
      </div>
    </>
  );
};

export default Career;
