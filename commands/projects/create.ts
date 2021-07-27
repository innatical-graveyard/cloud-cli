import API from "../../util/api.ts";
import { assertToken } from "../../util/auth.ts";

export default async (_: unknown, name: string) => {
  const token = await assertToken();
  await API.post("projects", {
    json: {
      name,
    },
    headers: {
      authorization: token,
    },
  });
};
