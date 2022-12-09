import imageUrlBuilder from "@sanity/image-url";
import { createClient } from "next-sanity";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;

const sanityClient = createClient({
  projectId,
  dataset,
  apiVersion: "2021-10-21",
  useCdn: true,
});

export default sanityClient;

const builder = imageUrlBuilder(sanityClient);

export const urlFor = (source) => {
  return builder.image(source);
};
