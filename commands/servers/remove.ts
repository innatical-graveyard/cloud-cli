import API from "../../util/api.ts";
import { assertToken } from "../../util/auth.ts";
import { assertProject } from "../../util/project.ts";

export default async (_: unknown, name: string) => {
  const token = await assertToken();
  const project = await assertProject();
  const servers = await API.get(`projects/${project}/servers`, {
    headers: {
      authorization: token,
    },
  }).json<{ id: string; name: string; model: string; ip: string }[]>();

  const server = servers.find(
    (server) => server.id === name || server.name === name
  );

  if (!server) {
    console.log("Server not found");
    Deno.exit(1);
  }

  await API.delete(`projects/${project}/servers/${server.id}`, {
    headers: {
      authorization: token,
    },
    timeout: false,
  });
};
