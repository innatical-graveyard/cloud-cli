import {
  Command,
  EnumType,
} from "https://deno.land/x/cliffy@v0.19.3/command/mod.ts";
import loginCommand from "./commands/login.ts";
import listProjects from "./commands/projects/list.ts";
import useProject from "./commands/projects/use.ts";
import createProject from "./commands/projects/create.ts";
import listServer from "./commands/servers/list.ts";
import createServer from "./commands/servers/create.ts";
import removeServer from "./commands/servers/remove.ts";
import listKeys from "./commands/keys/list.ts";
import removeKey from "./commands/keys/remove.ts";
import uploadKey from "./commands/keys/upload.ts";
import tokenCommand from "./commands/token.ts";
import listMembers from "./commands/members/list.ts";
import addMember from "./commands/members/add.ts";
import removeMember from "./commands/members/remove.ts";

const login = new Command()
  .description("Login using Innatical ID")
  .action(loginCommand);

const token = new Command()
  .description("Output your auth token")
  .action(tokenCommand);

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

const serverModel = new EnumType(["starter", "pro", "business", "enterprise"]);
const serverImages = new EnumType(["ubuntu-20.04"]);
const serverRegions = new EnumType(["HEL1", "LA1"]);
const billingCycle = new EnumType(["month", "year"]);

const servers = new Command()
  .description("Manage your servers")
  .command("list")
  .alias("ls")
  .description("List your servers")
  .action(listServer)
  .command(
    "create <name:string> <model:serverModel> <image:serverImages> <region:serverRegions> <cycle:billingCycle>"
  )
  .type("serverModel", serverModel)
  .type("serverImages", serverImages)
  .type("serverRegions", serverRegions)
  .type("billingCycle", billingCycle)
  .description(
    "Create a new server\nServer Models: starter, pro, business, enterprise\nImages: ubuntu-20.04\nRegions: LA1, HEL1\nBilling Cycle: month, year"
  )
  .action(createServer)
  .command("remove <name:string>")
  .alias("rm")
  .description("Remove a server")
  .action(removeServer);

const keys = new Command()
  .description("Manage your keys")
  .command("list")
  .alias("ls")
  .description("List your keys")
  .action(listKeys)
  .command("remove <name:string>")
  .alias("rm")
  .description("Remove a key")
  .action(removeKey)
  .command("upload <name:string> <path:string>")
  .description("Upload a key")
  .action(uploadKey);

const members = new Command()
  .description("Manage members")
  .command("list")
  .alias("ls")
  .description("List members")
  .action(listMembers)
  .command("add <username:string>")
  .description("Add member")
  .action(addMember)
  .command("remove <username:string>")
  .alias("rm")
  .description("Remove member")
  .action(removeMember);

try {
  await new Command()
    .name("inncloud")
    .version("0.1.0")
    .description("The developer native cloud by Innatical")
    .command("login", login)
    .command("token", token)
    .command("projects", projects)
    .command("servers", servers)
    .command("members", members)
    // .command("storage", storage)
    .command("keys", keys)
    .parse(Deno.args);
} catch (e) {
  console.log("An error occured: " + e);
}
