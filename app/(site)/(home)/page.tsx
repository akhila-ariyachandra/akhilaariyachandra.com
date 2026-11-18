import { buttonVariants } from "@/components/button";
import TypographyWrapper from "@/components/typography-wrapper";
import { PRODUCTION_URL } from "@/lib/constants";
import { type PERSONAL_INFO_QUERY_RESULT } from "@/sanity/generated/types";
import { urlFor } from "@/sanity/lib/image";
import {
  getDynamicFetchOptions,
  sanityFetch,
  type DynamicFetchOptions,
} from "@/sanity/lib/live";
import { CAREERS_QUERY, PERSONAL_INFO_QUERY } from "@/sanity/lib/queries";
import { type Route } from "next";
import { PortableText, type InferComponents } from "next-sanity";
import { ProfilePageJsonLd } from "next-seo";
import { draftMode } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import Career from "./career";

const HomePage = async () => {
  const { isEnabled: isDraftMode } = await draftMode();

  return (
    <>
      {isDraftMode ? (
        <Suspense
          fallback={
            <div className="text-zinc-600 dark:text-zinc-300">
              Loading About...
            </div>
          }
        >
          <DynamicAbout />
        </Suspense>
      ) : (
        <CachedAbout perspective="published" stega={false} />
      )}

      <Career />
    </>
  );
};

export default HomePage;

const DynamicAbout = async () => {
  const { perspective, stega } = await getDynamicFetchOptions();

  return <CachedAbout perspective={perspective} stega={stega} />;
};

const CachedAbout = async ({ perspective, stega }: DynamicFetchOptions) => {
  "use cache";

  const { data } = await sanityFetch({
    query: PERSONAL_INFO_QUERY,
    perspective,
    stega,
  });

  if (!data) {
    return null;
  }

  return (
    <section className="neobrutalism-container p-3 sm:p-4">
      <Image
        src={urlFor(data.picture).width(240).height(240).url()}
        width={240}
        height={240}
        alt="Akhila Ariyachandra"
        className="mb-4 w-44 rounded-sm border-2 border-black shadow-neobrutalism sm:mr-5 sm:mb-5 sm:w-60 sm:rounded-lg"
        priority
      />

      <h1 className="mb-4 text-3xl sm:mb-5 sm:text-4xl">
        Hi, I&apos;m{" "}
        <span className="font-black text-accent dark:text-accent-dark">
          Akhila Ariyachandra
        </span>
      </h1>

      <TypographyWrapper>
        <PortableText
          value={data.about}
          components={
            {
              types: {
                latestJob: async () => {
                  const { data } = await sanityFetch({
                    query: CAREERS_QUERY,
                    perspective,
                    stega,
                  });

                  const latestJob = data.at(0);

                  if (!latestJob) {
                    return null;
                  }

                  const firstLetter =
                    latestJob.position.toLowerCase().at(0) ?? "";

                  return (
                    <>
                      {["a", "e", "i", "o", "u"].includes(firstLetter)
                        ? "an"
                        : "a"}{" "}
                      {latestJob.position} at{" "}
                      <a
                        href={latestJob.company.url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {latestJob.company.name}
                      </a>
                    </>
                  );
                },
              },
              marks: {
                link: ({ value, children }) => {
                  if (!value) {
                    return children;
                  }

                  if (!value.openInNewTab) {
                    return (
                      <Link href={value.url as Route} title={value.label}>
                        {children}
                      </Link>
                    );
                  }

                  return (
                    <a
                      href={value.url}
                      title={value.label}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {children}
                    </a>
                  );
                },
              },
            } satisfies InferComponents<
              NonNullable<PERSONAL_INFO_QUERY_RESULT>["about"]
            >
          }
        />
      </TypographyWrapper>

      {!!data.resume && (
        <div className="mt-4 flex flex-row gap-4 sm:mt-6">
          <a
            href="/resume"
            download="Akhila_Heshan_Ariyachandra_Resume.pdf"
            rel="nofollow"
            className={buttonVariants()}
          >
            Resume
          </a>
        </div>
      )}

      <ProfilePageJsonLd
        mainEntity={{
          name: "Akhila Ariyachandra",
          givenName: "Akhila",
          familyName: "Ariyachandra",
          image: urlFor(data.picture).url(),
          description: "Web Developer",
          url: PRODUCTION_URL,
          sameAs: [
            "https://www.linkedin.com/in/akhila-ariyachandra/",
            "https://github.com/akhila-ariyachandra",
            "https://bsky.app/profile/akhilaariyachandra.com",
          ],
        }}
      />
    </section>
  );
};
