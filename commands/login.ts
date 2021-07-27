import { Application } from "https://deno.land/x/oak@v8.0.0/mod.ts";
const app = new Application();

export default async () => {
  app.use((ctx) => {
    const token = ctx.request.url.searchParams.get("token");
    ctx.response.body = "You may close this page now!";
  });

  console.log(
    "Login at https://id.innatical.com/connect?callback=http://localhost:8080"
  );
  await app.listen({ port: 8080 });
};
