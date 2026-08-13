import { urlFor } from "@/sanity/lib/image";
import { sanityFetchStaticParams } from "@/sanity/lib/live";
import { PERSONAL_INFO_QUERY } from "@/sanity/lib/queries";
import { type ProfilePage, type WithContext } from "schema-dts";

const ProfileStructuredData = async () => {
  const { data } = await sanityFetchStaticParams({
    query: PERSONAL_INFO_QUERY,
  });

  const jsonLd: WithContext<ProfilePage> = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    mainEntity: {
      "@type": "Person",
      name: "Akhila Ariyachandra",
      givenName: "Akhila",
      familyName: "Ariyachandra",
      image: data?.picture ? urlFor(data.picture).url() : undefined,
    },
  };

  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line @eslint-react/dom-no-dangerously-set-innerhtml
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
};

export default ProfileStructuredData;
