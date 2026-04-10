import prompts from "prompts";
import path from "path";
import fs from "fs-extra";
import ora from "ora";
import { execSync } from "child_process";
import { fileURLToPath } from "url";
import { getConfig } from "../utils/config.js";
import { getRegistry } from "../utils/registry.js";
import { logger } from "../utils/logger.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export async function addCommand(components, options) {
  const config = await getConfig();

  if (!config) {
    logger.error(
      "No nnuikit.json found. Run `npx nnuikit init` first to initialize your project."
    );
    process.exit(1);
  }

  const registry = await getRegistry();

  // If --all flag, add all components
  if (options.all) {
    components = Object.keys(registry.components);
  }

  // If no components specified, show interactive picker
  if (!components || components.length === 0) {
    const available = Object.entries(registry.components).map(
      ([key, comp]) => ({
        title: `${key} - ${comp.description}`,
        value: key,
      })
    );

    const response = await prompts({
      type: "multiselect",
      name: "components",
      message: "Which components would you like to add?",
      choices: available,
      hint: "Space to select, Enter to confirm",
    });

    if (!response.components || response.components.length === 0) {
      logger.warn("No components selected.");
      process.exit(0);
    }

    components = response.components;
  }

  // Validate components
  const invalid = components.filter((c) => !registry.components[c]);
  if (invalid.length > 0) {
    logger.error(`Unknown component(s): ${invalid.join(", ")}`);
    logger.info(
      `Available: ${Object.keys(registry.components).join(", ")}`
    );
    process.exit(1);
  }

  // Collect all dependencies
  const allDeps = new Set();
  const componentsToInstall = new Set();

  for (const name of components) {
    const component = registry.components[name];
    componentsToInstall.add(name);

    // Add component dependencies
    component.dependencies?.forEach((d) => allDeps.add(d));

    // Check registry dependencies (e.g., utils)
    if (component.registryDependencies?.includes("utils")) {
      registry.utils.dependencies?.forEach((d) => allDeps.add(d));
    }
  }

  // Confirm
  if (!options.yes) {
    logger.info("The following components will be added:");
    componentsToInstall.forEach((c) => console.log(`  - ${c}`));
    logger.break();

    if (allDeps.size > 0) {
      logger.info("Required dependencies:");
      allDeps.forEach((d) => console.log(`  - ${d}`));
      logger.break();
    }

    const { confirm } = await prompts({
      type: "confirm",
      name: "confirm",
      message: "Proceed?",
      initial: true,
    });

    if (!confirm) {
      logger.warn("Cancelled.");
      process.exit(0);
    }
  }

  const componentsDir = path.resolve(
    process.cwd(),
    config.componentsDir || "src/lib/components"
  );
  // Ensure utils are installed first
  const hasRegistryDeps = components.some((name) =>
    registry.components[name].registryDependencies?.includes("utils")
  );

  if (hasRegistryDeps) {
    const utilSpinner = ora("Setting up utilities...").start();
    for (const utilFile of registry.utils.files) {
      const targetPath = path.resolve(
        process.cwd(),
        config.utilsDir || "src/lib/utils",
        path.basename(utilFile.path)
      );

      if (!(await fs.pathExists(targetPath))) {
        // Try to fetch or use bundled content
        const content = getUtilContent(utilFile.path);
        if (content) {
          await fs.ensureDir(path.dirname(targetPath));
          await fs.writeFile(targetPath, content);
        }
      }
    }
    utilSpinner.succeed("Utilities ready");
  }

  // Install component files
  for (const name of components) {
    const component = registry.components[name];
    const spinner = ora(`Adding ${name}...`).start();

    for (const file of component.files) {
      const targetPath = path.resolve(componentsDir, file.path);

      // Check if file exists
      if ((await fs.pathExists(targetPath)) && !options.overwrite) {
        spinner.warn(
          `${file.path} already exists. Use --overwrite to replace.`
        );
        continue;
      }

      // Get file content
      const content = await getComponentContent(file);
      if (content) {
        await fs.ensureDir(path.dirname(targetPath));
        await fs.writeFile(targetPath, content);
      } else {
        spinner.warn(`Could not fetch ${file.path}`);
      }
    }

    spinner.succeed(`Added ${name}`);

    // Add @import for component tokens to the user's CSS file
    if (component.cssImport) {
      await addCssImport(component.cssImport, config);
    }
  }

  // Install npm dependencies
  if (allDeps.size > 0) {
    const depSpinner = ora("Installing dependencies...").start();
    try {
      const pm = detectPackageManager();
      const depsArray = [...allDeps];
      const installCmd =
        pm === "npm"
          ? `npm install ${depsArray.join(" ")}`
          : pm === "pnpm"
            ? `pnpm add ${depsArray.join(" ")}`
            : pm === "bun"
              ? `bun add ${depsArray.join(" ")}`
              : `yarn add ${depsArray.join(" ")}`;

      execSync(installCmd, { stdio: "pipe", cwd: process.cwd() });
      depSpinner.succeed("Dependencies installed");
    } catch {
      depSpinner.fail("Failed to install some dependencies");
      logger.warn(`Run manually: npm install ${[...allDeps].join(" ")}`);
    }
  }

  logger.break();
  logger.success("Done! Components added successfully.");
  logger.break();
  logger.info("Import example:");
  for (const name of components) {
    console.log(
      `  import { ${capitalize(name)} } from '$lib/components/ui/${name}';`
    );
  }
  logger.break();
}

async function getComponentContent(file) {
  // Read from the registry/ folder shipped with the npm package
  const registryDir = path.resolve(__dirname, "../../registry");

  // Map source path → registry path
  // e.g. "src/lib/components/ui/button/button.svelte" → "ui/button/button.svelte"
  //      "src/lib/utils/tailwindUtil.ts"              → "utils/tailwindUtil.ts"
  const registryPath = file.source
    .replace("src/lib/components/", "")
    .replace("src/lib/", "");

  const filePath = path.join(registryDir, registryPath);

  try {
    return await fs.readFile(filePath, "utf-8");
  } catch {
    logger.warn(`Could not read ${filePath}`);
    return null;
  }
}

function getUtilContent(filePath) {
  const registryDir = path.resolve(__dirname, "../../registry");
  const utilPath = path.join(registryDir, "utils", path.basename(filePath));

  try {
    return fs.readFileSync(utilPath, "utf-8");
  } catch {
    return null;
  }
}

async function addCssImport(importPath, config) {
  const cssPath = path.resolve(
    process.cwd(),
    config.cssPath || "src/routes/layout.css"
  );

  if (!(await fs.pathExists(cssPath))) {
    logger.warn(
      `CSS file not found at ${config.cssPath}. Add this import manually:`
    );
    console.log(`  @import '${importPath}';`);
    return;
  }

  const content = await fs.readFile(cssPath, "utf-8");
  const importLine = `@import '${importPath}';`;

  // Skip if already imported
  if (content.includes(importPath)) {
    return;
  }

  // Find the best place to insert:
  // 1. After existing component @import lines (if any)
  // 2. After @import 'tailwindcss' and @custom-variant lines
  // 3. Before the nnuikit design tokens block
  const lines = content.split("\n");
  let insertAt = -1;

  for (let i = 0; i < lines.length; i++) {
    const trimmed = lines[i].trim();
    // Track last @import or @custom-variant line
    if (trimmed.startsWith("@import") || trimmed.startsWith("@custom-variant")) {
      insertAt = i + 1;
    }
    // Stop before the nnuikit tokens block
    if (trimmed.includes("nnuikit design tokens")) {
      // Insert right before this marker
      if (insertAt === -1) insertAt = i;
      break;
    }
    // Stop at first :root block if no marker found
    if (trimmed === ":root {" && insertAt > -1) {
      break;
    }
  }

  if (insertAt > -1) {
    lines.splice(insertAt, 0, importLine);
  } else {
    // No good insertion point — add after first line
    lines.splice(1, 0, importLine);
  }

  await fs.writeFile(cssPath, lines.join("\n"));
  logger.success(`Added ${importLine} to ${config.cssPath}`);
}

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function detectPackageManager() {
  const cwd = process.cwd();
  if (
    fs.existsSync(path.join(cwd, "bun.lockb")) ||
    fs.existsSync(path.join(cwd, "bun.lock"))
  )
    return "bun";
  if (fs.existsSync(path.join(cwd, "pnpm-lock.yaml"))) return "pnpm";
  if (fs.existsSync(path.join(cwd, "yarn.lock"))) return "yarn";
  return "npm";
}
