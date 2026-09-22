import Title from "@/_components/title";
import TypographyWrapper from "@/_components/typography-wrapper";
import { PRODUCTION_URL } from "@/_lib/constants";
import {
  postDateViewTransitionName,
  postTitleViewTransitionName,
} from "@/_lib/view-transition-names";
import type { POST_BY_SLUG_QUERY_RESULT } from "@/sanity/generated/types";
import { urlFor } from "@/sanity/lib/image";
import {
  type DynamicFetchOptions,
  getDynamicFetchOptions,
  sanityFetch,
} from "@/sanity/lib/live";
import { POST_BY_SLUG_QUERY } from "@/sanity/lib/queries";
import { createBlurUp } from "@mux/blurup";
import MuxPlayer from "@mux/mux-player-react";
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
import type { Route } from "next";
import { type InferComponents, PortableText, stegaClean } from "next-sanity";
import { ArticleJsonLd, BreadcrumbJsonLd } from "next-seo";
import { draftMode } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import { notFound, permanentRedirect } from "next/navigation";
import { type ComponentProps, ViewTransition } from "react";
import OutdatedContentBanner from "./outdated-content-banner";

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

const BlogPost = async ({
  params,
  archived = false,
}: PageProps<"/blog/[slug]"> & { archived?: boolean }) => {
  const { isEnabled: isDraftMode } = await draftMode();

  if (isDraftMode) {
    return <DynamicBlogPost params={params} archived={archived} />;
  }

  const { slug } = await params;

  return (
    <CachedBlogPost
      slug={slug}
      perspective="published"
      stega={false}
      archived={archived}
    />
  );
};

export default BlogPost;

const DynamicBlogPost = async ({
  params,
  archived,
}: Pick<PageProps<"/blog/[slug]">, "params"> & { archived: boolean }) => {
  const [{ slug }, { perspective, stega }] = await Promise.all([
    params,
    getDynamicFetchOptions(),
  ]);

  return (
    <CachedBlogPost
      slug={slug}
      perspective={perspective}
      stega={stega}
      archived={archived}
    />
  );
};

const CachedBlogPost = async ({
  slug,
  perspective,
  stega,
  archived,
}: Awaited<PageProps<"/blog/[slug]">["params"]> &
  DynamicFetchOptions & { archived: boolean }) => {
  "use cache";

  const { data: post } = await sanityFetch({
    query: POST_BY_SLUG_QUERY,
    params: { slug, archived },
    perspective,
    stega,
  });

  if (!post) {
    // Check if the post has been archived
    if (!archived) {
      const { data } = await sanityFetch({
        query: POST_BY_SLUG_QUERY,
        params: { slug, archived: true },
        perspective,
        stega,
      });

      if (data) {
        permanentRedirect(`/blog/archive/${data.slug.current}` as Route);
      }
    }

    notFound();
  }

  return (
    <>
      {/* eslint-disable-next-line @eslint-react/dom-no-dangerously-set-innerhtml */}
      <style dangerouslySetInnerHTML={{ __html: highlightCss }} />

      {post.archived && <OutdatedContentBanner />}

      <article className="neobrutalism-container p-3 sm:p-4">
        <ViewTransition name={postTitleViewTransitionName(post.slug.current)}>
          <Title>{post.title}</Title>
        </ViewTransition>

        <ViewTransition name={postDateViewTransitionName(post.slug.current)}>
          <div className="mb-4 text-sm font-semibold sm:mb-5 sm:text-base">
            <time dateTime={dayjs(post.posted).toISOString()}>
              {dayjs(post.posted).format("Do MMMM YYYY")}
            </time>
          </div>
        </ViewTransition>

        <TypographyWrapper>
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
                      <div className="not-prose my-4 overflow-hidden rounded border-2 border-black shadow-neobrutalism first:mt-0 last:mb-0">
                        {!!title && (
                          <div className="border-b-2 border-b-black bg-green-300 px-6 py-4 text-sm font-semibold theme-transition dark:bg-green-900">
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
                      <figure className="not-prose my-6 overflow-hidden neobrutalism-container first:mt-0 last:mb-0 sm:my-8">
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
                          <figcaption className="border-t-2 border-t-black bg-green-300 p-2 text-center text-sm font-semibold text-pretty theme-transition sm:p-3 sm:text-base dark:bg-green-900">
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
                          "not-prose my-4 rounded border-2 border-black p-3 first:mt-0 last:mb-0 sm:my-5 sm:p-4",
                          {
                            "bg-zinc-100 dark:bg-zinc-900": type === "default",
                            "bg-yellow-100 dark:bg-yellow-950": type === "info",
                            "bg-red-100 dark:bg-red-950": type === "warn",
                          },
                          "[&_code]:font-semibold [&_code]:before:content-['`'] [&_code]:after:content-['`']",
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
                                    className="font-semibold text-accent no-underline hover:underline dark:text-accent-dark"
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
                      <hr className="h-1 rounded-full border-0 bg-black dark:bg-white" />
                    );
                  },
                  video: async ({ value }) => {
                    const { asset } = value.video;

                    if (!asset?.playbackId) {
                      return null;
                    }

                    const { blurDataURL, aspectRatio, width } =
                      await createBlurUp(asset.playbackId);

                    const style: ComponentProps<typeof MuxPlayer>["style"] = {
                      width,
                      aspectRatio,
                    };

                    if (value.hideControls) {
                      style["--controls"] = "none";
                    }

                    return (
                      <MuxPlayer
                        videoTitle={value.title}
                        playbackId={asset.playbackId}
                        autoPlay={value.autoplay ? "muted" : false}
                        loop={value.loop}
                        accentColor="var(--color-green-500)"
                        className="mx-auto my-4 block max-w-full overflow-hidden neobrutalism-container first:mt-0 last:mb-0"
                        style={style}
                        placeholder={blurDataURL}
                      />
                    );
                  },
                  iframe: ({ value }) => {
                    return (
                      <iframe
                        src={value.url}
                        className="my-4 h-125 w-full overflow-hidden neobrutalism-container first:mt-0 last:mb-0"
                        loading="lazy"
                        sandbox=""
                      />
                    );
                  },
                  codeSandbox: ({ value }) => {
                    return (
                      <iframe
                        src={`https://codesandbox.io/embed/${value.id}?autoresize=1&fontsize=14&hidenavigation=1&theme=dark`}
                        allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
                        // eslint-disable-next-line @eslint-react/dom-no-unsafe-iframe-sandbox -- CodeSandbox embeds require allow-same-origin + allow-scripts together to run; src is fixed to the trusted codesandbox.io origin
                        sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
                        className="my-4 h-125 w-full overflow-hidden neobrutalism-container first:mt-0 last:mb-0"
                        loading="lazy"
                      />
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
        </TypographyWrapper>
      </article>

      {!archived && (
        <>
          <BreadcrumbJsonLd
            items={[
              { name: "Home", item: PRODUCTION_URL },
              { name: "Blog", item: `${PRODUCTION_URL}/blog` },
              {
                name: post.title,
                item: `${PRODUCTION_URL}/blog/${post.slug.current}`,
              },
            ]}
          />

          <ArticleJsonLd
            type="BlogPosting"
            headline={post.title}
            description={post.description}
            url={`${PRODUCTION_URL}/blog/${post.slug.current}`}
            mainEntityOfPage={`${PRODUCTION_URL}/blog/${post.slug.current}`}
            image={`${PRODUCTION_URL}/blog/${post.slug.current}/opengraph-image`}
            datePublished={dayjs(post.posted).toISOString()}
            dateModified={dayjs(post._updatedAt).toISOString()}
            author={{
              "@type": "Person",
              name: "Akhila Ariyachandra",
              url: PRODUCTION_URL,
            }}
          />
        </>
      )}
    </>
  );
};
