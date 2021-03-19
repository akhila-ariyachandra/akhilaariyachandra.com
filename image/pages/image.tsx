import config from "lib/config";
import Image from "next/image";
import SEO from "components/SEO";
import type { NextPage } from "next";
import { useRouter } from "next/router";

const ImageBanner: NextPage = () => {
  const router = useRouter();

  const searchParams = new URLSearchParams(router.asPath.split(/\?/)[1]);

  const title = searchParams.get("title");
  const slug = searchParams.get("slug");
  const date = searchParams.get("date");

  if (!title || !slug) {
    return null;
  }

  return (
    <div className="w-[1200px] h-[630px] flex flex-col justify-between p-10 bg-gray-900 border border-8 border-green-600 rounded-lg box-border">
      <div>
        {date ? (
          <p className="text-gray-400 text-2xl font-medium">{date}</p>
        ) : null}

        <h1 className="text-gray-100 text-7xl font-bold leading-tight">
          {title}
        </h1>
      </div>

      <div className="flex items-center space-x-10">
        <div className="w-[150px] h-[150px] border border-4 border-gray-100 rounded-full overflow-hidden">
          <Image src="/profile.jpg" width={1407} height={1407} quality={100} />
        </div>

        <div className="space-y-2">
          <h2 className="text-gray-100 text-4xl font-medium">{config.title}</h2>
          <h3 className="text-green-600 text-2xl">{`${config.siteUrl}${slug}`}</h3>
        </div>
      </div>

      <SEO />
    </div>
  );
};

export default ImageBanner;
