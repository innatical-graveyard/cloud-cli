import { getToken } from "../util/auth.ts";

export default async () => {
  console.log(await getToken());
};
