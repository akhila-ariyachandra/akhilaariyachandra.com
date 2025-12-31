import { PRODUCTION_URL } from "@/_lib/constants";
import { cn } from "@/_lib/helpers";
import { getNowPlaying } from "@/_lib/spotify";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata } from "next";
import { cacheLife } from "next/cache";
import { Geist, Geist_Mono } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { Suspense, type CSSProperties, type ReactNode } from "react";
import Header from "./_components/header";
import "./globals.css";
import "./syntax-highlighting.css";

const geistMono = Geist_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-geist-mono",
});
const geist = Geist({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Akhila Ariyachandra",
    template: "%s | Akhila Ariyachandra",
  },
  description: "Web Developer",
  metadataBase: new URL(PRODUCTION_URL),
  openGraph: {
    title: {
      default: "Akhila Ariyachandra",
      template: "%s | Akhila Ariyachandra",
    },
    description: "Web Developer",
    url: "/",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    creator: "@heshan_1010",
  },
  alternates: {
    canonical: "/",
  },
};

const RootLayout = async ({ children }: { children: ReactNode }) => {
  return (
    <html
      lang="en"
      className={cn(geistMono.variable, "min-h-dvh scroll-smooth")}
      data-scroll-behavior="smooth"
    >
      <body
        className={cn(
          geist.className,
          "font-content flex min-h-dvh flex-col bg-white antialiased dark:bg-zinc-950",
          "transition-colors duration-200 ease-out",
        )}
      >
        <Header />

        <main className="container max-w-4xl flex-1 p-3 sm:p-4">
          {children}
        </main>

        <Footer />

        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
};

export default RootLayout;

const getYear = async () => {
  "use cache";

  cacheLife("days");

  return new Date().getFullYear();
};

const MOBILE_ALBUM_ART_DIMENSIONS = 50;
const ALBUM_ART_DIMENSIONS = 75;

const Footer = async () => {
  const year = await getYear();

  return (
    <footer
      className="container max-w-4xl space-y-4 p-3 text-zinc-600 sm:p-4 dark:text-zinc-300"
      style={
        {
          "--album-art-dimensions": `${ALBUM_ART_DIMENSIONS.toString()}px`,
          "--mobile-album-art-dimensions": `${MOBILE_ALBUM_ART_DIMENSIONS.toString()}px`,
        } as CSSProperties
      }
    >
      <Suspense
        fallback={
          <div className="h-(--mobile-album-art-dimensions) sm:h-(--album-art-dimensions)" />
        }
      >
        <NowPlaying />
      </Suspense>

      <p className="text-sm sm:text-base">
        &copy; {year}{" "}
        <Link
          href="/"
          className="text-accent dark:text-accent-dark hover:underline"
        >
          Akhila Ariyachandra
        </Link>
      </p>
    </footer>
  );
};

const NowPlaying = async () => {
  const nowPlaying = await getNowPlaying();

  const nowPlayingSong =
    typeof nowPlaying !== "string" ? nowPlaying.item : undefined;
  const albumArt = nowPlayingSong?.album.images.find(
    (image) => image.width >= ALBUM_ART_DIMENSIONS,
  )?.url;

  if (!nowPlayingSong || !albumArt) {
    return (
      <div className="h-(--mobile-album-art-dimensions) sm:h-(--album-art-dimensions)" />
    );
  }

  return (
    <div className="flex items-center gap-4">
      <a
        href={nowPlayingSong.album.external_urls.spotify}
        target="_blank"
        rel="noopener noreferrer"
        className="relative"
      >
        <Image
          src={albumArt}
          alt={nowPlayingSong.album.name}
          width={ALBUM_ART_DIMENSIONS}
          height={ALBUM_ART_DIMENSIONS}
          className="size-(--mobile-album-art-dimensions) rounded-sm sm:size-(--album-art-dimensions)"
        />

        <span className="sr-only">{nowPlayingSong.album.name}</span>

        <span
          className="absolute top-0 right-0 size-3 translate-x-1/2 -translate-y-1/2 animate-ping rounded-full bg-[#1ed760] select-none"
          aria-hidden="true"
        />
      </a>

      <div className="min-w-0 flex-1">
        <p className="truncate text-lg font-medium sm:text-xl">
          <a
            href={nowPlayingSong.external_urls.spotify}
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent dark:text-accent-dark hover:underline"
          >
            {nowPlayingSong.name}
          </a>
        </p>

        <p className="truncate text-sm sm:text-base">
          {nowPlayingSong.artists.map((artist) => artist.name).join(", ")}
        </p>
      </div>
    </div>
  );
};
