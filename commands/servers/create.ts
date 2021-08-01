import API from "../../util/api.ts";
import { assertToken } from "../../util/auth.ts";
import { assertProject } from "../../util/project.ts";

export default async (
  _: unknown,
  name: string,
  model: string,
  image: string,
  region: string,
  cycle: string,
) => {
  const project = await assertProject();
  const token = await assertToken();
  const data = await API.post(`projects/${project}/servers`, {
    json: {
      name,
      model,
      image,
      region,
      cycle,
    },
    headers: {
      authorization: token,
    },
    timeout: false,
  }).json<{ ip: string }>();

  console.log("Server created with IP " + data.ip);
  console.log("An invoice due in one day has been sent to your email.");
};
