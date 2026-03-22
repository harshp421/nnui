import fs from "fs-extra";
import path from "path";

const CONFIG_FILE = "nnuikit.json";

export async function getConfig(cwd = process.cwd()) {
  const configPath = path.resolve(cwd, CONFIG_FILE);

  if (!(await fs.pathExists(configPath))) {
    return null;
  }

  return fs.readJson(configPath);
}

export async function writeConfig(config, cwd = process.cwd()) {
  const configPath = path.resolve(cwd, CONFIG_FILE);
  await fs.writeJson(configPath, config, { spaces: 2 });
}

export function resolveAliasPath(aliasPath, cwd = process.cwd()) {
  // Convert $lib/components -> src/lib/components
  return path.resolve(cwd, aliasPath.replace("$lib", "src/lib"));
}
