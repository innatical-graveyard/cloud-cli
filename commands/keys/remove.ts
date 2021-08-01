import API from "../../util/api.ts";
import { assertToken } from "../../util/auth.ts";
import { assertProject } from "../../util/project.ts";

export default async (_: unknown, name: string) => {
  const token = await assertToken();
  const keys = await API.get(`keys`, {
    headers: {
      authorization: token,
    },
  }).json<{ id: string; name: string }[]>();

  const key = keys.find((key) => key.id === name || key.name === name);

  if (!key) {
    console.log("Key not found");
    Deno.exit(1);
  }

  await API.delete(`keys/${key.id}`, {
    headers: {
      authorization: token,
    },
  });
};
