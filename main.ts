import {
  Command,
  EnumType,
} from "https://deno.land/x/cliffy@v0.19.3/command/mod.ts";
import loginCommand from "./commands/login.ts";
import listProjects from "./commands/projects/list.ts";
import useProject from "./commands/projects/use.ts";
import createProject from "./commands/projects/create.ts";
import listBoxes from "./commands/boxes/list.ts";
import createBox from "./commands/boxes/create.ts";

const login = new Command()
  .description("Login using Innatical ID")
  .action(loginCommand);

const projects = new Command()
  .description("Manage your projects")
  .command("list")
  .alias("ls")
  .description("List your projects")
  .action(listProjects)
  .command("use <name:string>")
  .description("Switch your current project")
  .action(useProject)
  .command("create <name:string>")
  .description("Create a new project")
  .action(createProject);

const boxModel = new EnumType(["starter", "pro", "business", "enterprise"]);
const boxImages = new EnumType(["ubuntu-20.04"]);
const boxRegions = new EnumType(["HEL1", "LA1"]);

const boxes = new Command()
  .description("Manage your boxes")
  .command("list")
  .alias("ls")
  .description("List your boxes")
  .action(listBoxes)
  .command(
    "create <name:string> <model:boxModel> <image:boxImages> <region:boxRegions>"
  )
  .type("boxModel", boxModel)
  .type("boxImages", boxImages)
  .type("boxRegions", boxRegions)
  .description(
    "Create a new box\nBox Models: starter, pro, business, enterprise\nImages: ubuntu-20.04\nRegions: LA1, HEL1"
  )
  .action(createBox);

try {
  await new Command()
    .name("inncloud")
    .version("0.1.0")
    .description("The developer native cloud by Innatical")
    .command("login", login)
    .command("projects", projects)
    .command("boxes", boxes)
    .parse(Deno.args);
} catch (e) {
  console.log("An error occured: " + e);
}
