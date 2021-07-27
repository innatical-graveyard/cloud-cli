import ky from "https://cdn.skypack.dev/ky?dts";

const API = ky.extend({
  prefixUrl: "http://localhost:3001/",
});

export default API;
