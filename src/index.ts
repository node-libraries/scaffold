#!/usr/bin/env node
import path from "path";
import { program } from "commander";
import { create } from "./commands/create";
import { help } from "./commands/help";

// eslint-disable-next-line @typescript-eslint/no-require-imports
const pkg = require(path.resolve(__dirname, "../package.json"));
program.version(pkg.version || "unknown");
program.addCommand(create);
program.addCommand(help, { isDefault: true });
program.parse(process.argv);
