import API from "../../util/api.ts";
import { assertToken } from "../../util/auth.ts";

export default async (_: unknown, name: string, keyPath: string) => {
  const token = await assertToken();
  const key = await Deno.readTextFile(keyPath);

  await API.post("keys", {
    json: {
      name,
      key,
    },
    headers: {
      authorization: token,
    },
  });
};
