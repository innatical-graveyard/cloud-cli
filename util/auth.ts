import storage from "./storage.ts";

export const setToken = async (token: string) => {
  await storage.set("inncloud-token", token);
};

export const getToken = async () => {
  return await storage.get("inncloud-token");
};

export const assertToken = async () => {
  const token = await getToken();
  if (!token) {
    console.log("Not logged in!");
    Deno.exit(1);
  }

  return token;
};
