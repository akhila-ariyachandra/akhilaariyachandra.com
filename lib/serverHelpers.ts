import { getPlaiceholder } from "plaiceholder";

export const getBlurredBanner = async (banner: string): Promise<string> => {
  const { base64 } = await getPlaiceholder(banner, { size: 16 });

  return base64;
};
