import { assertToken } from "../../util/auth.ts";
import API from "../../util/api.ts";
import { assertProject } from "../../util/project.ts";

export default async (_: unknown, username: string) => {
  const token = await assertToken();
  const project = await assertProject();
  const members = await API.get(`projects/${project}/members`, {
    headers: {
      authorization: token,
    },
  }).json<{ id: string; username: string; owner: boolean }[]>();

  const member = members.find(
    (member) => member.id === username || member.username === username
  );

  if (!member) {
    console.log("Member not found");
    Deno.exit(1);
  }

  await API.delete(`projects/${project}/members/${member.id}`, {
    headers: {
      authorization: token,
    },
  });
};
