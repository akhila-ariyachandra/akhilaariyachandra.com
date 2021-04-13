import Layout from "@/components/Layout";
import SEO from "@/components/SEO";
import Image from "next/image";
import ListContainer from "@/components/ListContainer";
import fs from "fs";
import path from "path";
import yaml from "yaml";
import dayjs from "dayjs";
import type { NextPage, GetStaticProps } from "next";
import type { Job } from "@/lib/types";
import { getPeriod } from "@/lib/helpers";

type Props = {
  careerList: Job[];
};

const Career: NextPage<Props> = ({ careerList }) => {
  return (
    <Layout>
      <SEO title="Career" description="My work experience" />

      <ListContainer title="Career">
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
                    {`(${getPeriod(
                      company.overallPeriod.startDate,
                      company.overallPeriod.endDate
                    )})`}
                  </p>
                )}
              </div>

              {company.positions.map((position) => (
                <div key={position.title} className="space-y-1 truncate">
                  <p className="dark:text-gray-200 text-gray-800 text-xl font-semibold truncate">
                    {position.title}
                  </p>

                  <p className="dark:text-gray-200 text-gray-800 text-base font-normal truncate">
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
    </Layout>
  );
};

export default Career;

export const getStaticProps: GetStaticProps = async () => {
  const careerFile = path.join("content", "career.yaml");
  const file = fs.readFileSync(careerFile, "utf8");
  const fileContent = yaml.parse(file);

  const careerList: Job[] = fileContent.map((element) => {
    const job: Job = {
      company: element.company,
      image: element.image,
      link: element.link,
      positions: element.positions,
      overallPeriod:
        element.positions.length > 1
          ? {
              startDate:
                element.positions[element.positions.length - 1].startDate,
              endDate: element.positions[0].endDate,
            }
          : null,
    };

    return job;
  });

  return {
    props: { careerList },
  };
};
