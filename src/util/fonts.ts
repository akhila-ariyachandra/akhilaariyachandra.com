import FontFaceObserver from "fontfaceobserver";

export const Fonts = async () => {
  const link = document.createElement("link");
  link.href = "https://fonts.googleapis.com/css?family=Inter&display=swap";
  link.rel = "stylesheet";

  document.head.appendChild(link);

  const inter = new FontFaceObserver("Inter");

  await inter.load();

  document.documentElement.classList.add("inter");
};
