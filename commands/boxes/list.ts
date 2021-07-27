import { assertToken } from "../../util/auth.ts";
import API from "../../util/api.ts";
import { Table } from "https://deno.land/x/cliffy@v0.19.3/table/table.ts";
import { assertProject } from "../../util/project.ts";

export default async () => {
  const token = await assertToken();
  const project = await assertProject();
  const projects = await API.get(`projects/${project}/servers`, {
    headers: {
      authorization: token,
    },
  }).json<{ id: string; name: string; model: string; ip: string }[]>();

  new Table()
    .header(["id", "name", "model", "ip"])
    .body(projects.map(({ id, name, model, ip }) => [id, name, model, ip]))
    .render();
};
