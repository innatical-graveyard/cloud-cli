import API from "../../util/api.ts";
import { assertToken } from "../../util/auth.ts";
import { assertProject } from "../../util/project.ts";

export default async (
  _: unknown,
  name: string,
  model: string,
  image: string,
  region: string
) => {
  const project = await assertProject();
  const token = await assertToken();
  await API.post(`projects/${project}/servers`, {
    json: {
      name,
      model,
      image,
      region,
    },
    headers: {
      authorization: token,
    },
  });
};
