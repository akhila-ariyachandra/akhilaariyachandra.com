// Querying with "sanityFetch" will keep content automatically updated
// Before using it, import and render "<SanityLive />" in your layout, see
// https://github.com/sanity-io/next-sanity#live-content-api for more information.
import { type QueryParams } from "next-sanity";
import {
  defineLive,
  type LivePerspective,
  resolvePerspectiveFromCookies,
} from "next-sanity/live";
import { cacheLife } from "next/cache";
import { cookies, draftMode } from "next/headers";
import { client } from "./client";
import { token } from "./token";

export const { sanityFetch, SanityLive } = defineLive({
  client,
  serverToken: token,
  // The browser token is exposed to browsers in draft/live preview.
  // It must be read-only and scoped to the minimum required permissions.
  browserToken: token,
  strict: true,
});

export type DynamicFetchOptions = {
  perspective: LivePerspective;
  stega: boolean;
};

export async function getDynamicFetchOptions(): Promise<DynamicFetchOptions> {
  const { isEnabled: isDraftMode } = await draftMode();
  if (!isDraftMode) {
    return { perspective: "published", stega: false };
  }
  const jar = await cookies();
  const perspective = await resolvePerspectiveFromCookies({ cookies: jar });

  return { perspective: perspective, stega: true };
}

// For usage within generateStaticParams
export async function sanityFetchStaticParams<
  const QueryString extends string,
>({ query, params = {} }: { query: QueryString; params?: QueryParams }) {
  "use cache";

  const { data } = await sanityFetch({
    query,
    params,
    perspective: "published",
    stega: false,
  });

  return { data };
}

// For usage within generateMetadata and generateViewport
export async function sanityFetchMetadata<const QueryString extends string>({
  query,
  params = {},
  perspective,
}: {
  query: QueryString;
  params?: QueryParams;
  perspective: LivePerspective;
}) {
  "use cache";

  const { data } = await sanityFetch({
    query,
    params,
    perspective,
    stega: false,
  });

  return { data };
}

// For usage in routes that don't render "<SanityLive />" (sitemap, OG images)
// Live events can be missed, so revalidate daily instead of relying on them
export async function sanityFetchNonLive<const QueryString extends string>({
  query,
  params = {},
  perspective = "published",
}: {
  query: QueryString;
  params?: QueryParams;
  perspective?: LivePerspective;
}) {
  "use cache";

  const { data } = await sanityFetch({
    query,
    params,
    perspective,
    stega: false,
  });

  // The shortest cacheLife in a scope wins, so this overrides the "sanity" profile
  cacheLife("days");

  return { data };
}
