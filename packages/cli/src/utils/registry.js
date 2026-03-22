import fs from "fs-extra";
import path from "path";
import { fileURLToPath } from "url";
import { getConfig } from "./config.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REGISTRY_JSON_PATH = path.resolve(__dirname, "../../registry/registry.json");

/**
 * Returns the component registry.
 *
 * Priority:
 * 1. Remote URL — ONLY if user explicitly set `registryUrl` in nnuikit.json
 * 2. Local registry.json — ships with the npm package in registry/ folder
 */
export async function getRegistry(cwd = process.cwd()) {
  const config = await getConfig(cwd);

  // Only fetch remote if user explicitly configured a custom registry URL
  if (config?.registryUrl) {
    try {
      const response = await fetch(
        `${config.registryUrl}/src/lib/registry/registry.json`
      );
      if (response.ok) {
        return response.json();
      }
    } catch {
      // Remote failed — fall through to local
    }
  }

  // Read from the registry.json shipped with the package
  try {
    return await fs.readJson(REGISTRY_JSON_PATH);
  } catch {
    throw new Error(
      "Could not find registry.json. Your nnuikit installation may be corrupted."
    );
  }
}
