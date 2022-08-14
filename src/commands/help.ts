import { program } from "commander";

export const help = program.createCommand("help").action(() => {
  program.help();
});
