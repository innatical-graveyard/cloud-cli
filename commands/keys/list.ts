import { assertToken } from "../../util/auth.ts";
import API from "../../util/api.ts";
import { Table } from "https://deno.land/x/cliffy@v0.19.3/table/table.ts";

export default async () => {
  const token = await assertToken();
  const keys = await API.get("keys", {
    headers: {
      authorization: token,
    },
  }).json<{ id: string; name: string }[]>();

  new Table()
    .header(["id", "name"])
    .body(keys.map(({ id, name }) => [id, name]))
    .render();
};
