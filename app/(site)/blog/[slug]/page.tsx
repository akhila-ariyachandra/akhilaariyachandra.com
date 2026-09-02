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
  `@media (prefers-color-scheme: dark) {\n${createThemeRule(":root", githubDarkTheme)}\n}`,
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
@media (prefers-color-scheme: dark) {
  .th-line--highlighted { border-left-color: var(--color-accent-dark); }
}`,
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

      <Title>{post.title}</Title>

      <div className="mb-4 text-sm text-zinc-600 sm:mb-5 sm:text-base dark:text-zinc-400">
        <time dateTime={dayjs(post.posted).toISOString()}>
          {dayjs(post.posted).format("Do MMMM YYYY")}
        </time>
      </div>

      <div
        className={cn(
          "prose prose-sm prose-zinc sm:prose-base dark:prose-invert max-w-none", // Base styles
          "prose-headings:font-display prose-headings:tracking-tighter", // Headings
          "prose-a:font-medium prose-a:text-accent prose-a:no-underline prose-a:hover:underline dark:prose-a:text-accent-dark", // Links
          "mb-16",
        )}
      >
        <PortableText
          value={post.content}
          components={
            {
              types: {
                code: ({ value }) => {
                  const { htmlMarkup, title } = createHighlightedCodeBlockProps(
                    {
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
                    },
                  );

                  return (
                    <div className="not-prose overflow-hidden rounded">
                      {!!title && (
                        <div className="bg-zinc-100 px-6 py-4 text-sm font-medium text-zinc-600 dark:bg-zinc-900 dark:text-zinc-400">
                          {title}
                        </div>
                      )}

                      {/* eslint-disable-next-line @eslint-react/dom-no-dangerously-set-innerhtml */}
                      <div dangerouslySetInnerHTML={{ __html: htmlMarkup }} />
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
                    <figure className="not-prose my-6 sm:my-8">
                      <Image
                        src={urlFor(value.asset).url()}
                        width={width}
                        height={height}
                        alt={value.alt}
                        className={cn(
                          "mx-auto rounded-sm sm:rounded-md",
                          !!darkImageAsset && "dark:hidden",
                        )}
                      />

                      {!!darkSrc && !!darkWidth && !!darkHeight && (
                        <Image
                          src={darkSrc}
                          width={darkWidth}
                          height={darkHeight}
                          alt={value.alt}
                          className="mx-auto hidden rounded-sm sm:rounded-md dark:block"
                        />
                      )}

                      {!!value.caption && (
                        <figcaption className="mt-2 text-center text-sm text-pretty text-zinc-700 sm:mt-3 sm:text-base dark:text-zinc-300">
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
                        "not-prose my-4 border-l-4 p-3 sm:my-5 sm:p-4",
                        {
                          "border-zinc-600 dark:border-zinc-400":
                            type === "default",
                          "border-yellow-600 dark:border-yellow-400":
                            type === "info",
                          "border-red-600 dark:border-red-400": type === "warn",
                        },
                        "[&_a]:text-accent dark:[&_a]:text-accent-dark [&_a]:no-underline [&_a:hover]:underline",
                        "[&_code]:font-display [&_code]:font-semibold before:[&_code]:content-['`'] after:[&_code]:content-['`']",
                      )}
                    >
                      <PortableText value={value.content} />
                    </div>
                  );
                },
                horizontalLine: () => {
                  return <hr />;
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
