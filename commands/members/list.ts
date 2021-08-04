import { assertToken } from "../../util/auth.ts";
import API from "../../util/api.ts";
import { Table } from "https://deno.land/x/cliffy@v0.19.3/table/table.ts";
import { assertProject } from "../../util/project.ts";

export default async () => {
  const token = await assertToken();
  const project = await assertProject();
  const members = await API.get(`projects/${project}/members`, {
    headers: {
      authorization: token,
    },
  }).json<{ id: string; username: string; owner: boolean }[]>();

  new Table()
    .header(["id", "username", "owner"])
    .body(
      members.map(({ id, username, owner }) => [id, username, String(owner)])
    )
    .render();
};
