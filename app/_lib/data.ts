import ifsLogo from "@/_assets/company-logos/ifs.jpeg";
import srilankanLogo from "@/_assets/company-logos/srilankan_airlines.jpeg";
import villvayLogo from "@/_assets/company-logos/villvay.jpeg";
import type { StaticImageData } from "next/image";
import "server-only";

export const career: {
  position: string;
  company: {
    name: string;
    url: string;
    logo: StaticImageData;
  };
  duration: {
    start: string;
    end?: string;
  };
  description: string[];
  technologies: string[];
}[] = [
  {
    position: "Associate Technical Lead",
    company: {
      name: "Villvay",
      url: "https://villvay.com",
      logo: villvayLogo,
    },
    duration: {
      start: "08/01/2023",
    },
    description: [
      "Leading the development of B2B e-commerce sites for clients in the woodworking industry in the US",
      "Lead the initial development of the mobile app of a B2B e-commerce for a client in the woodworking industry in the US ",
      "Worked on the redesign of the Villvay website",
      "Worked on overhauling the front-end development process for all projects at Villvay by reviewing pull requests and suggesting improvements for them, introducing standards and quality checks, and standardizing library use among frontend projects",
    ],
    technologies: [
      "React",
      "React Server Components",
      "Next.js",
      "Zustand",
      "TanStack Query",
      "Tailwind CSS",
      "shadcn/ui",
      "Turborepo",
      "Sanity",
      "React Native",
      "Expo",
    ],
  },
  {
    position: "Senior Software Engineer",
    company: {
      name: "Villvay",
      url: "https://villvay.com",
      logo: villvayLogo,
    },
    duration: {
      start: "04/02/2021",
      end: "07/31/2023",
    },
    description: [
      "Worked on a system an Australian client that allows users to book vehicles for service and providers to manage their bookings and vehicles",
      "Worked on the redesign of the Villvay website",
    ],
    technologies: [
      "React",
      "React Server Components",
      "Next.js",
      "Redux",
      "TanStack Query",
    ],
  },
  {
    position: "Software Engineer",
    company: {
      name: "IFS",
      url: "https://www.ifs.com/",
      logo: ifsLogo,
    },
    duration: {
      start: "03/18/2019",
      end: "01/04/2021",
    },
    description: [
      "Customized various modules of IFS Applications to meet the client's requirements",
      "Upgraded the client's IFS Applications to later versions",
    ],
    technologies: ["IFS Applications"],
  },
  {
    position: "Software Engineer",
    company: {
      name: "Villvay",
      url: "https://villvay.com",
      logo: villvayLogo,
    },
    duration: {
      start: "07/16/2018",
      end: "03/15/2019",
    },
    description: ["Developed the mobile app of a volunteering platform"],
    technologies: ["React", "Redux", "React Native"],
  },
  {
    position: "Associate Software Engineer",
    company: {
      name: "Villvay",
      url: "https://villvay.com",
      logo: villvayLogo,
    },
    duration: {
      start: "01/15/2018",
      end: "07/15/2018",
    },
    description: ["Developed the mobile app of a volunteering platform"],
    technologies: ["React", "Redux", "React Native"],
  },
  {
    position: "Intern Software Engineer",
    company: {
      name: "SriLankan Airlines",
      url: "https://www.srilankan.com",
      logo: srilankanLogo,
    },
    duration: {
      start: "06/04/2016",
      end: "12/04/2016",
    },
    description: ["Contributed to the development of an internal CMS"],
    technologies: [
      ".NET",
      "C#",
      "SQL Server",
      "HTML",
      "CSS",
      "JavaScript",
      "jQuery",
    ],
  },
] as const;
