import { PRODUCTION_URL } from "@/_lib/constants";
import { ProfilePage, WithContext } from "schema-dts";

const jsonLd: WithContext<ProfilePage> = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  mainEntity: {
    "@type": "Person",
    name: "Akhila Ariyachandra",
    givenName: "Akhila",
    familyName: "Ariyachandra",
    image: `${PRODUCTION_URL}/profile-pic.png`,
  },
};

const ProfileStructuredData = () => {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
};

export default ProfileStructuredData;
