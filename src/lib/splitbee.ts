import splitbee from "@splitbee/web";

splitbee.init({
  // Set custom urls when using proxying
  scriptUrl: "/bee.js",
  apiUrl: "/_hive",
});

export default splitbee;
