import { PRODUCTION_URL } from "@/_lib/constants";
import { type ProfilePage, type WithContext } from "schema-dts";

const jsonLd: WithContext<ProfilePage> = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  mainEntity: {
    "@type": "Person",
    name: "Akhila Ariyachandra",
    givenName: "Akhila",
    familyName: "Ariyachandra",
    image: `${PRODUCTION_URL}/profile-pic.jpg`,
  },
};

const ProfileStructuredData = () => {
  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line @eslint-react/dom/no-dangerously-set-innerhtml
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
};

export default ProfileStructuredData;
