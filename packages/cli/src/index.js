#!/usr/bin/env node

import { Command } from "commander";
import { initCommand } from "./commands/init.js";
import { addCommand } from "./commands/add.js";

const program = new Command();

program
  .name("nnuikit")
  .description("Add nnuikit components to your Svelte project")
  .version("0.0.1");

program
  .command("init")
  .description("Initialize nnuikit in your Svelte project")
  .option("-y, --yes", "Skip prompts and use defaults")
  .action(initCommand);

program
  .command("add")
  .description("Add a component to your project")
  .argument("[components...]", "Components to add (e.g. button checkbox)")
  .option("-a, --all", "Add all available components")
  .option("-y, --yes", "Skip confirmation prompt")
  .option("-o, --overwrite", "Overwrite existing files")
  .action(addCommand);

program
  .command("list")
  .description("List all available components")
  .action(async () => {
    const { getRegistry } = await import("./utils/registry.js");
    const { logger } = await import("./utils/logger.js");
    const registry = await getRegistry();
    logger.info("Available components:\n");
    for (const [name, component] of Object.entries(registry.components)) {
      console.log(`  - ${name}: ${component.description}`);
    }
    console.log("");
  });

program.parse();
