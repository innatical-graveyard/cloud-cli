import { Command } from "https://deno.land/x/cliffy@v0.19.3/command/mod.ts";
import loginCommand from "./commands/login.ts";

const login = new Command()
  .description("Login using Innatical ID")
  .action(loginCommand);

await new Command()
  .name("inncloud")
  .version("0.1.0")
  .description("The developer native cloud by Innatical")
  .command("login", login)
  .parse(Deno.args);
