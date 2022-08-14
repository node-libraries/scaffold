#!/usr/bin/env node
import { program } from "commander";
import { create } from "./commands/create";
import { help } from "./commands/help";

program.version(process.env.npm_package_version || "unknown");
program.addCommand(create);
program.addCommand(help, { isDefault: true });
program.parse(process.argv);
