import SEO from "@/components/SEO";
import Image from "next/image";
import ListContainer from "@/components/ListContainer";
import fs from "fs";
import path from "path";
import dayjs from "dayjs";
import YAML from "yaml";
import type { NextPage, GetStaticProps } from "next";
import type { Job } from "@/lib/types";
import { getPeriod } from "@/lib/helpers";

type Props = {
  careerList: Job[];
};

const Career: NextPage<Props> = ({ careerList }) => {
  return (
    <>
      <SEO title="Career" description="My work experience" />

      <div className="mx-auto max-w-xl">
        <ListContainer title="Career">
          {careerList.map((company) => (
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
                <div className="flex flex-row text-xl space-x-2 truncate">
                  <a
                    href={company.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="dark:text-emerald-600 text-emerald-700 font-sora font-medium truncate"
                  >
                    {company.company}
                  </a>

                  {company.overallPeriod && (
                    <p className="dark:text-gray-200 text-gray-800 font-sora font-normal truncate">
                      {`(${getPeriod(
                        company.overallPeriod.startDate,
                        company.overallPeriod.endDate
                      )})`}
                    </p>
                  )}
                </div>

                {company.positions.map((position) => (
                  <div key={position.title} className="space-y-1 truncate">
                    <p className="dark:text-gray-200 text-gray-800 font-sora text-xl font-semibold truncate">
                      {position.title}
                    </p>

                    <p className="dark:text-gray-200 text-gray-800 font-roboto-slab text-base font-normal truncate">
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

export const getStaticProps: GetStaticProps = async () => {
  const careerFile = path.join("content", "career.yaml");
  const file = fs.readFileSync(careerFile, "utf8");
  const fileContent = YAML.parse(file);

  const careerList: Job[] = [];

  for (let index = 0; index < fileContent.length; index++) {
    const element = fileContent[index];

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

    careerList.push(job);
  }

  return {
    props: { careerList },
  };
};
