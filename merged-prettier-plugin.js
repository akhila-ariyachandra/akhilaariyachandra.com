// Workaround for prettier-plugin-organize-imports conflicting with prettier-plugin-tailwindcss
// https://github.com/tailwindlabs/prettier-plugin-tailwindcss/issues/26#issue-1115203782

const tailwind = require("prettier-plugin-tailwindcss");
const organizeImports = require("prettier-plugin-organize-imports");

const combinedFormatter = {
  ...tailwind,
  parsers: {
    ...tailwind.parsers,
    ...Object.keys(organizeImports.parsers).reduce((acc, key) => {
      acc[key] = {
        ...tailwind.parsers[key],
        preprocess(code, options) {
          return organizeImports.parsers[key].preprocess(code, options);
        },
      };
      return acc;
    }, {}),
  },
};

module.exports = combinedFormatter;
