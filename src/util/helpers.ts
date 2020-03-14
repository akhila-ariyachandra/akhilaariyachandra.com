export const formatTags = tagsArray => {
  let tags = null;

  for (let i = 0; i < tagsArray.length; i++) {
    if (i === 0) {
      tags = tagsArray[i];
    } else {
      tags = `${tags}, ${tagsArray[i]}`;
    }
  }

  return tags;
};
