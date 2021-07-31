import configDir from "https://deno.land/x/config_dir@v0.1.1/mod.ts";
import { Store } from "https://deno.land/x/store@v1.2.0/mod.ts";

const path = configDir();
if (!path) {
  console.log("Config directory not found!");
  Deno.exit(1);
}

// await Deno.(join(path, "inncloud.datastore"));
const storage = new Store({
  path,
  name: "inncloud.datastore",
});

export default storage;
