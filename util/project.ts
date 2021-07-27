import storage from "./storage.ts";

export const setProject = async (id: string) => {
  await storage.set("inncloud-project", id);
};

export const getProject = async () => {
  return await storage.get("inncloud-project");
};

export const assertProject = async () => {
  const id = await getProject();
  if (!id) {
    console.log("No project selected, please select one!");
    Deno.exit(1);
  }

  return id;
};
