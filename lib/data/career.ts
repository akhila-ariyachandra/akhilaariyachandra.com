type Job = {
  company: string;
  image: string;
  link: string;
  positions: { title: string; startDate: string; endDate?: string }[];
  overallPeriod?: {
    startDate: string;
    endDate?: string;
  };
};

let career: Job[] = [
  {
    company: "Villvay",
    image: "villvay.png",
    link: "https://villvay.com/",
    positions: [
      {
        title: "Senior Software Engineer",
        startDate: "2021-04-02",
      },
    ],
  },
  {
    company: "IFS Sri Lanka",
    image: "ifs.png",
    link: "https://www.ifs.com/lk/",
    positions: [
      {
        title: "Software Engineer",
        startDate: "2019-03-18",
        endDate: "2021-04-01",
      },
    ],
  },
  {
    company: "Villvay",
    image: "villvay.png",
    link: "https://villvay.com/",
    positions: [
      {
        title: "Software Engineer",
        startDate: "2018-07-15",
        endDate: "2019-03-15",
      },
      {
        title: "Associate Software Engineer",
        startDate: "2018-01-15",
        endDate: "2018-07-15",
      },
    ],
  },
  {
    company: "SriLankan Airlines",
    image: "srilankan.png",
    link: "https://www.srilankan.com/en_uk/lk",
    positions: [
      {
        title: "Intern Software Engineer",
        startDate: "2016-06-05",
        endDate: "2016-12-05",
      },
    ],
  },
];

career = career.map((job) => ({
  ...job,
  overallPeriod:
    job.positions.length > 1
      ? {
          startDate: job.positions[job.positions.length - 1].startDate,
          endDate: job.positions[0].endDate,
        }
      : null,
}));

export default career;
