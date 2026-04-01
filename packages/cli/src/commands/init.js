import prompts from "prompts";
import path from "path";
import fs from "fs-extra";
import ora from "ora";
import { execSync } from "child_process";
import { fileURLToPath } from "url";
import { writeConfig } from "../utils/config.js";
import { logger } from "../utils/logger.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export async function initCommand(options) {
  logger.info("Initializing nnuikit in your project...\n");

  // Check if this is a Svelte/SvelteKit project
  const pkgPath = path.resolve(process.cwd(), "package.json");
  if (!(await fs.pathExists(pkgPath))) {
    logger.error(
      "No package.json found. Please run this command in a Svelte project root."
    );
    process.exit(1);
  }

  const pkg = await fs.readJson(pkgPath);
  const hasSvelte =
    pkg.dependencies?.svelte ||
    pkg.devDependencies?.svelte ||
    pkg.dependencies?.["@sveltejs/kit"] ||
    pkg.devDependencies?.["@sveltejs/kit"];

  if (!hasSvelte) {
    logger.warn(
      "This doesn't appear to be a Svelte project. nnuikit components are built for Svelte 5+."
    );
  }

  let response;

  if (options.yes) {
    // Use defaults — no prompts
    response = {
      componentsDir: "src/lib/components",
      utilsDir: "src/lib/utils",
      cssPath: "src/routes/layout.css",
      installDeps: true,
    };
  } else {
    response = await prompts([
      {
        type: "text",
        name: "componentsDir",
        message: "Where should components be installed?",
        initial: "src/lib/components",
      },
      {
        type: "text",
        name: "utilsDir",
        message: "Where should utility files be installed?",
        initial: "src/lib/utils",
      },
      {
        type: "text",
        name: "cssPath",
        message: "Where is your global CSS file? (for design tokens)",
        initial: "src/routes/layout.css",
      },
      {
        type: "confirm",
        name: "installDeps",
        message:
          "Install base dependencies? (clsx, tailwind-merge, tailwind-variants)",
        initial: true,
      },
    ]);

    if (!response.componentsDir) {
      logger.error("Init cancelled.");
      process.exit(0);
    }
  }

  const config = {
    $schema: "https://nnuikit.dev/schema.json",
    componentsDir: response.componentsDir,
    utilsDir: response.utilsDir,
    cssPath: response.cssPath,
    aliases: {
      components: "$lib/components",
      utils: "$lib/utils",
    },
  };

  // Write config
  const spinner = ora("Writing nnuikit.json...").start();
  await writeConfig(config);
  spinner.succeed("Created nnuikit.json");

  // Create directories
  const componentsDir = path.resolve(process.cwd(), response.componentsDir);
  const utilsDir = path.resolve(process.cwd(), response.utilsDir);
  await fs.ensureDir(componentsDir);
  await fs.ensureDir(utilsDir);
  logger.success(`Created ${response.componentsDir}/`);
  logger.success(`Created ${response.utilsDir}/`);

  // Write utility file
  const utilContent = `import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
\treturn twMerge(clsx(inputs));
}

export type WithElementRef<T, U extends HTMLElement = HTMLElement> = T & { ref?: U | null };
`;

  const utilFilePath = path.resolve(utilsDir, "tailwindUtil.ts");
  if (!(await fs.pathExists(utilFilePath))) {
    await fs.writeFile(utilFilePath, utilContent);
    logger.success("Created utils/tailwindUtil.ts");
  } else {
    logger.warn("utils/tailwindUtil.ts already exists, skipping");
  }

  // Install dependencies
  if (response.installDeps) {
    const deps = ["clsx", "tailwind-merge", "tailwind-variants"];
    const spinner2 = ora("Installing dependencies...").start();

    try {
      const pm = detectPackageManager();
      const installCmd =
        pm === "npm"
          ? `npm install ${deps.join(" ")}`
          : pm === "pnpm"
            ? `pnpm add ${deps.join(" ")}`
            : pm === "bun"
              ? `bun add ${deps.join(" ")}`
              : `yarn add ${deps.join(" ")}`;

      execSync(installCmd, { stdio: "pipe", cwd: process.cwd() });
      spinner2.succeed("Installed base dependencies");
    } catch (error) {
      spinner2.fail("Failed to install dependencies");
      logger.warn(`Run manually: npm install ${deps.join(" ")}`);
    }
  }

  // Write base design tokens to user's CSS file
  const tokenSpinner = ora("Writing base design tokens...").start();
  try {
    const baseTokensSource = path.resolve(__dirname, "../../registry/base-tokens.css");
    const baseTokensContent = await fs.readFile(baseTokensSource, "utf-8");

    const cssFilePath = path.resolve(process.cwd(), response.cssPath);

    if (await fs.pathExists(cssFilePath)) {
      // Append @import for base tokens after any existing @import lines
      const existing = await fs.readFile(cssFilePath, "utf-8");
      const importLine = `@import '$lib/nnuikit-tokens.css';`;

      if (!existing.includes("nnuikit-tokens.css")) {
        const lines = existing.split("\n");
        let insertAt = 0;
        for (let i = 0; i < lines.length; i++) {
          if (lines[i].trim().startsWith("@import")) insertAt = i + 1;
        }
        lines.splice(insertAt, 0, importLine);
        await fs.writeFile(cssFilePath, lines.join("\n"));
      }
    }

    // Write the token file to src/lib/
    const tokenDest = path.resolve(process.cwd(), "src/lib/nnuikit-tokens.css");
    await fs.ensureDir(path.dirname(tokenDest));
    if (!(await fs.pathExists(tokenDest))) {
      await fs.writeFile(tokenDest, baseTokensContent);
      tokenSpinner.succeed("Created src/lib/nnuikit-tokens.css  (base design tokens)");
    } else {
      tokenSpinner.succeed("src/lib/nnuikit-tokens.css already exists, skipping");
    }
  } catch {
    tokenSpinner.warn("Could not write base tokens — copy them manually from the docs");
  }

  logger.break();
  logger.success("nnuikit initialized successfully!");
  logger.break();
  logger.info("Next steps:");
  console.log("  1. Base design tokens written to src/lib/nnuikit-tokens.css");
  console.log("  2. Customize your brand color: https://nnuikit.dev/docs/getting-started/theming");
  console.log("  3. Run: npx nnuikit add button");
  console.log("  4. Import: import { Button } from '$lib/components/ui/button'");
  logger.break();
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
