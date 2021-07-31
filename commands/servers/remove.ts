import API from "../../util/api.ts";
import { assertToken } from "../../util/auth.ts";

export default async (_: unknown, name: string) => {
  const token = await assertToken();
  const project = await assertProject();
  const projects = await API.get(`projects/${project}/servers`, {
    headers: {
      authorization: token,
    },
  }).json<{ id: string; name: string; model: string; ip: string }[]>();

  const project = projects.find(
    (project) => project.id === name || project.name === name
  );

  if (!project) {
    console.log("Project not found");
    Deno.exit(1);
  }

  setProject(project.id);
};
