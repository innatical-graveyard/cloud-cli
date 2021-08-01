import ky from "https://cdn.skypack.dev/ky?dts";

const API = ky.extend({
  prefixUrl: "https://api.innatical.cloud/",
});

export default API;
