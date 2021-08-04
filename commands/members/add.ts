import { assertToken } from "../../util/auth.ts";
import API from "../../util/api.ts";
import { assertProject } from "../../util/project.ts";

export default async (_: unknown, username: string) => {
  const token = await assertToken();
  const project = await assertProject();
  await API.post(`projects/${project}/members/${username}`, {
    headers: {
      authorization: token,
    },
  });
};
