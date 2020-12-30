import Layout from "src/components/Layout";
import SEO from "src/components/SEO";
import Image from "next/image";
import fs from "fs";
import path from "path";
import yaml from "yaml";
import dayjs from "dayjs";
import type { NextPage, GetStaticProps } from "next";
import type { Job } from "src/lib/types";
import { trackEvent } from "src/lib/splitbee";

type Props = {
  careerList: Job[];
};

const Career: NextPage<Props> = ({ careerList }) => {
  return (
    <Layout>
      <SEO title="Career" description="My work experience" />

      <div className="p-4 space-y-10">
        {careerList.map((company) => (
          <div
            key={company.company}
            className="grid gap-4 place-content-center place-items-center pr-4"
          >
            <Image
              src={`/career/${company.image}`}
              alt={company.company}
              title={company.company}
              className="w-24 h-24 rounded-md"
              width={128}
              height={128}
            />

            <a
              href={company.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-center dark:text-green-600 text-green-700 text-2xl font-semibold"
              onClick={() => {
                trackEvent("Open Company Link", { name: company.company });
              }}
            >
              {company.company}
            </a>

            {company.positions.map((position) => (
              <div key={position.title}>
                <p className="text-center text-black dark:text-white text-xl font-medium">
                  {position.title}
                </p>
                <p className="text-center text-black dark:text-white text-lg font-normal">
                  {position.period}
                </p>
              </div>
            ))}
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
    };

    return job;
  });

  return {
    props: { careerList },
  };
};
