import { assertToken } from "../../util/auth.ts";
import API from "../../util/api.ts";
import { Table } from "https://deno.land/x/cliffy@v0.19.3/table/table.ts";

export default async () => {
  const token = await assertToken();
  const projects = await API.get("projects", {
    headers: {
      authorization: token,
    },
  }).json<{ id: string; name: string }[]>();

  new Table()
    .header(["id", "name"])
    .body(projects.map(({ id, name }) => [id, name]))
    .render();
};
