/**
 * Since API requests from the server must contain absolute URLs,
 * this function gets the proper base URL if called from the server
 * @returns {string} Base URL
 */
export const getBaseURL = () => {
  if (typeof window !== "undefined") {
    return "";
  }

  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }

  return "http://localhost:3000";
};
