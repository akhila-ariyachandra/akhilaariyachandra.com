const robots = () => {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
    ],
    sitemap: "https://akhilaariyachandra.com/sitemap.xml",
    host: "https://akhilaariyachandra.com",
  };
};

export default robots;
