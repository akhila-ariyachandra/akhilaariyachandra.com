export const getParagraphs = (text: string) => {
  return text.split("\n").map((paragraph) => paragraph.trim());
};
