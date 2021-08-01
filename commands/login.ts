import { Application } from "https://deno.land/x/oak@v8.0.0/mod.ts";
import API from "../util/api.ts";
import { setToken } from "../util/auth.ts";

const app = new Application();

export default async () => {
  app.use((ctx) => {
    const token = ctx.request.url.searchParams.get("token");
    ctx.response.body = "You may close this page now!";
    if (!token) return;
    (async () => {
      const res = await API.post("login", {
        json: {
          token,
        },
      }).json<{ token: string }>();
      await setToken(res.token);
      Deno.exit();
    })().catch((e) => {
      console.log("Error while trying to login: " + e);
      Deno.exit(1);
    });
  });

  console.log(
    "Login at https://id.innatical.com/connect?callback=http://localhost:8080",
  );
  await app.listen({ port: 8080 });
};
