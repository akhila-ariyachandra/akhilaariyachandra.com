import BlogPostingStructuredData from "@/_components/structured-data/blog-posting";
import BreadcrumbStructuredData from "@/_components/structured-data/breadcrumb";
import Title from "@/_components/title";
import { PRODUCTION_URL } from "@/_lib/constants";
import type { POST_BY_SLUG_QUERY_RESULT } from "@/sanity/generated/types";
import { urlFor } from "@/sanity/lib/image";
import {
  type DynamicFetchOptions,
  getDynamicFetchOptions,
  sanityFetch,
  sanityFetchMetadata,
  sanityFetchStaticParams,
} from "@/sanity/lib/live";
import { POST_BY_SLUG_QUERY, POSTS_QUERY } from "@/sanity/lib/queries";
import { getImageDimensions } from "@sanity/asset-utils";
import { createHighlighter } from "@tanstack/highlight";
import { css } from "@tanstack/highlight/languages/css";
import { html } from "@tanstack/highlight/languages/html";
import { js } from "@tanstack/highlight/languages/js";
import { json } from "@tanstack/highlight/languages/json";
import { jsx } from "@tanstack/highlight/languages/jsx";
import { ts } from "@tanstack/highlight/languages/ts";
import { tsx } from "@tanstack/highlight/languages/tsx";
import { yaml } from "@tanstack/highlight/languages/yaml";
import { createHighlightedCodeBlockProps } from "@tanstack/highlight/react";
import { createThemeBaseCss, createThemeRule } from "@tanstack/highlight/theme";
import { githubDarkTheme } from "@tanstack/highlight/themes/github-dark";
import { githubLightTheme } from "@tanstack/highlight/themes/github-light";
import { cn } from "cn";
import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import type { Metadata, Route } from "next";
import { type InferComponents, PortableText, stegaClean } from "next-sanity";
import { draftMode } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

dayjs.extend(advancedFormat);

type PostContent = NonNullable<POST_BY_SLUG_QUERY_RESULT>["content"];

const highlightCss = [
  createThemeRule(":root", githubLightTheme),
  createThemeRule(".dark", githubDarkTheme),
  createThemeBaseCss(),
  `pre.th-code:has(.th-line) { padding-inline: 0; }
pre.th-code > code { display: inline-block; min-width: 100%; }
.th-line {
  box-sizing: border-box;
  border-left: 4px solid transparent;
  padding-inline: 1rem;
}
.th-line--highlighted {
  border-left-color: var(--color-accent);
  background: color-mix(in srgb, var(--color-zinc-500) 10%, transparent);
}
.dark .th-line--highlighted { border-left-color: var(--color-accent-dark); }`,
].join("\n\n");
const highlighter = createHighlighter({
  languages: [ts, tsx, js, jsx, json, css, html, yaml],
});

export const generateStaticParams = async () => {
  const { data } = await sanityFetchStaticParams({
    query: POSTS_QUERY,
  });

  return data.map((post) => ({
    slug: post.slug.current,
  }));
};

export const generateMetadata = async ({
  params,
}: PageProps<"/blog/[slug]">): Promise<Metadata> => {
  const [{ slug }, { perspective }] = await Promise.all([
    params,
    getDynamicFetchOptions(),
  ]);

  const { data: post } = await sanityFetchMetadata({
    query: POST_BY_SLUG_QUERY,
    params: { slug },
    perspective,
  });

  if (!post) {
    notFound();
  }

  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      url: `/blog/${slug}`,
      type: "article",
      publishedTime: dayjs(post.posted).toISOString(),
    },
    alternates: {
      canonical: `/blog/${slug}`,
    },
    authors: {
      name: "Akhila Ariyachandra",
      url: new URL(PRODUCTION_URL),
    },
  };
};

const BlogPostPage = async ({ params }: PageProps<"/blog/[slug]">) => {
  const { isEnabled: isDraftMode } = await draftMode();

  if (isDraftMode) {
    return <DynamicBlogPostPage params={params} />;
  }

  const { slug } = await params;

  return (
    <CachedBlogPostPage slug={slug} perspective="published" stega={false} />
  );
};

export default BlogPostPage;

const DynamicBlogPostPage = async ({
  params,
}: Pick<PageProps<"/blog/[slug]">, "params">) => {
  const [{ slug }, { perspective, stega }] = await Promise.all([
    params,
    getDynamicFetchOptions(),
  ]);

  return (
    <CachedBlogPostPage slug={slug} perspective={perspective} stega={stega} />
  );
};

const CachedBlogPostPage = async ({
  slug,
  perspective,
  stega,
}: Awaited<PageProps<"/blog/[slug]">["params"]> & DynamicFetchOptions) => {
  "use cache";

  const { data: post } = await sanityFetch({
    query: POST_BY_SLUG_QUERY,
    params: { slug },
    perspective,
    stega,
  });

  if (!post) {
    notFound();
  }

  return (
    <>
      {/* eslint-disable-next-line @eslint-react/dom-no-dangerously-set-innerhtml */}
      <style dangerouslySetInnerHTML={{ __html: highlightCss }} />

      <article className="neobrutalism-container p-3 sm:p-4">
        <Title>{post.title}</Title>

        <div className="mb-4 text-sm font-semibold sm:mb-5 sm:text-base">
          <time dateTime={dayjs(post.posted).toISOString()}>
            {dayjs(post.posted).format("Do MMMM YYYY")}
          </time>
        </div>

        <div
          className={cn(
            "prose prose-sm prose-zinc sm:prose-base dark:prose-invert max-w-none font-medium text-black dark:text-white", // Base styles
            "prose-a:font-medium prose-a:text-accent prose-a:no-underline prose-a:hover:underline dark:prose-a:text-accent-dark", // Links
          )}
        >
          <PortableText
            value={post.content}
            components={
              {
                types: {
                  code: ({ value }) => {
                    const { htmlMarkup, title } =
                      createHighlightedCodeBlockProps({
                        highlighter,
                        code: value.code ?? "",
                        lang: stegaClean(value.language),
                        title: value.filename,
                        decorations: value.highlightedLines?.length
                          ? value.highlightedLines.map((line) => ({
                              lines: line,
                              className: "th-line--highlighted",
                            }))
                          : undefined,
                      });

                    return (
                      <div className="not-prose shadow-neobrutalism overflow-hidden rounded border-2 border-black">
                        {!!title && (
                          <div className="theme-transition border-b-2 border-b-black bg-green-300 px-6 py-4 text-sm font-semibold dark:bg-green-900">
                            {title}
                          </div>
                        )}

                        <div
                          className="[&_.th-code]:theme-transition"
                          // eslint-disable-next-line @eslint-react/dom-no-dangerously-set-innerhtml
                          dangerouslySetInnerHTML={{ __html: htmlMarkup }}
                        />
                      </div>
                    );
                  },
                  image: ({ value }) => {
                    if (!value.asset) {
                      return null;
                    }

                    const { width, height } = getImageDimensions(value.asset);

                    const darkImageAsset = value.darkImage?.asset;
                    const darkSrc = darkImageAsset
                      ? urlFor(darkImageAsset).url()
                      : undefined;
                    let darkWidth: number | undefined = undefined;
                    let darkHeight: number | undefined = undefined;
                    if (darkImageAsset) {
                      const { width, height } =
                        getImageDimensions(darkImageAsset);

                      darkWidth = width;
                      darkHeight = height;
                    }

                    return (
                      <figure className="not-prose neobrutalism-container my-6 sm:my-8">
                        <Image
                          src={urlFor(value.asset).url()}
                          width={width}
                          height={height}
                          alt={value.alt}
                          className={cn(
                            "mx-auto",
                            !!darkImageAsset && "dark:hidden",
                          )}
                        />

                        {!!darkSrc && !!darkWidth && !!darkHeight && (
                          <Image
                            src={darkSrc}
                            width={darkWidth}
                            height={darkHeight}
                            alt={value.alt}
                            className="mx-auto hidden dark:block"
                          />
                        )}

                        {!!value.caption && (
                          <figcaption className="theme-transition border-t-2 border-t-black bg-green-300 p-2 text-center text-sm font-semibold text-pretty sm:p-3 sm:text-base dark:bg-green-900">
                            {value.caption}
                          </figcaption>
                        )}
                      </figure>
                    );
                  },
                  callout: ({ value }) => {
                    const type = stegaClean(value.type);

                    return (
                      <div
                        className={cn(
                          "not-prose my-4 rounded border-2 p-3 sm:my-5 sm:p-4",
                          {
                            "border-zinc-600 dark:border-zinc-400":
                              type === "default",
                            "border-yellow-600 dark:border-yellow-400":
                              type === "info",
                            "border-red-600 dark:border-red-400":
                              type === "warn",
                          },
                          "[&_code]:font-semibold before:[&_code]:content-['`'] after:[&_code]:content-['`']",
                        )}
                      >
                        <PortableText
                          value={value.content}
                          components={{
                            marks: {
                              link: ({ value, children }) => {
                                return (
                                  <a
                                    href={value?.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-accent dark:text-accent-dark no-underline hover:underline"
                                  >
                                    {children}
                                  </a>
                                );
                              },
                            },
                          }}
                        />
                      </div>
                    );
                  },
                  horizontalLine: () => {
                    return (
                      <hr className="h-1 rounded-full border-0 bg-black" />
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
              } satisfies InferComponents<PostContent>
            }
          />
        </div>
      </article>

      <BreadcrumbStructuredData
        items={[
          { name: "Home", route: "/" },
          { name: "Blog", route: "/blog" },
          { name: post.title, route: `/blog/${post.slug.current}` },
        ]}
      />
      <BlogPostingStructuredData
        title={post.title}
        posted={post.posted}
        updated={post._updatedAt}
      />
    </>
  );
};
