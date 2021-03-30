import Layout from "@/components/Layout";
import SEO from "@/components/SEO";
import Image from "next/image";
import fs from "fs";
import path from "path";
import yaml from "yaml";
import dayjs from "dayjs";
import type { NextPage, GetStaticProps } from "next";
import type { Job } from "@/lib/types";

type Props = {
  careerList: Job[];
};

const Career: NextPage<Props> = ({ careerList }) => {
  return (
    <Layout>
      <SEO title="Career" description="My work experience" />

      <h1 className="mx-4 my-10 dark:text-gray-200 text-gray-800 text-4xl font-bold">
        Career
      </h1>

      <div className="p-4 space-y-10">
        {careerList.map((company) => (
          <div
            key={company.company}
            className="flex flex-row items-center space-x-4"
          >
            <div className="flex-shrink-0 w-16 h-16 rounded-md overflow-hidden">
              <Image
                src={`/career/${company.image}`}
                alt={company.company}
                title={company.company}
                width={128}
                height={128}
              />
            </div>

            <div className="space-y-3 truncate">
              <div className="flex flex-row text-xl space-x-2 truncate">
                <a
                  href={company.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="dark:text-green-600 text-green-700 font-medium truncate"
                >
                  {company.company}
                </a>

                {company.overallPeriod && (
                  <p className="dark:text-gray-200 text-gray-800 font-normal truncate">
                    {`(${company.overallPeriod})`}
                  </p>
                )}
              </div>

              {company.positions.map((position) => (
                <div key={position.title} className="space-y-1 truncate">
                  <p className="dark:text-gray-200 text-gray-800 text-xl font-semibold truncate">
                    {position.title}
                  </p>

                  <p className="dark:text-gray-200 text-gray-800 text-base font-normal truncate">
                    {position.period}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Layout>
  );
};

export default Career;

export const getStaticProps: GetStaticProps = async () => {
  const careerFile = path.join("content", "career.yaml");
  const file = fs.readFileSync(careerFile, "utf8");
  const fileContent = yaml.parse(file);

  const careerList: Job[] = fileContent.map((element) => {
    const getPeriod = (startDate, endDate) => {
      const years = endDate.diff(startDate, "year");
      const months = endDate.diff(startDate, "month") - years * 12;

      let period = null;

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

      return period;
    };

    const job: Job = {
      company: element.company,
      image: element.image,
      link: element.link,
      positions: element.positions.map((position) => {
        const period = `${dayjs(position.startDate).format("MMMM YYYY")} - ${
          position.endDate
            ? dayjs(position.endDate).format("MMMM YYYY")
            : "Present"
        } (${getPeriod(
          dayjs(position.startDate),
          position.endDate ? dayjs(position.endDate) : dayjs()
        )})`;

        return {
          title: position.title,
          period,
        };
      }),
      overallPeriod:
        element.positions.length > 1
          ? getPeriod(
              dayjs(element.positions[element.positions.length - 1].startDate),
              dayjs(element.positions[0].endDate)
            )
          : null,
    };

    return job;
  });

  return {
    props: { careerList },
  };
};
