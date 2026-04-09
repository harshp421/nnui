#!/usr/bin/env node

/**
 * Syncs component source files from the main project into the CLI's
 * registry/ folder. Automatically detects ALL components and utils.
 *
 * Usage:  npm run sync-registry
 * Auto:   runs on `npm publish` via prepublishOnly hook
 *
 * It scans:
 *   src/lib/components/ui/**  →  registry/ui/**
 *   src/lib/utils/**          →  registry/utils/**
 */

import fs from "fs-extra";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const cliRoot = path.resolve(__dirname, "..");
const projectRoot = path.resolve(cliRoot, "../..");
const registryDir = path.join(cliRoot, "registry");

// Backup registry.json before wiping
let registryJsonBackup = null;
const registryJsonFile = path.join(registryDir, "registry.json");
if (fs.existsSync(registryJsonFile)) {
  registryJsonBackup = fs.readFileSync(registryJsonFile, "utf-8");
}

// Clean old registry to remove deleted components
if (fs.existsSync(registryDir)) {
  fs.removeSync(registryDir);
}
fs.ensureDirSync(registryDir);

let count = 0;

console.log("Syncing registry files...\n");

// ── 1. Sync all UI components ──────────────────────────────────────
const uiDir = path.join(projectRoot, "src/lib/components/ui");

if (fs.existsSync(uiDir)) {
  const components = fs.readdirSync(uiDir, { withFileTypes: true });

  for (const entry of components) {
    if (!entry.isDirectory()) continue;

    const componentDir = path.join(uiDir, entry.name);
    const files = fs.readdirSync(componentDir);

    for (const file of files) {
      const src = path.join(componentDir, file);
      const dest = path.join(registryDir, "ui", entry.name, file);

      // Only sync files, not subdirectories
      if (!fs.statSync(src).isFile()) continue;

      fs.ensureDirSync(path.dirname(dest));
      fs.copyFileSync(src, dest);
      console.log(`  COPY  ui/${entry.name}/${file}`);
      count++;
    }
  }
}

// ── 2. Sync all utils ──────────────────────────────────────────────
const utilsDir = path.join(projectRoot, "src/lib/utils");

if (fs.existsSync(utilsDir)) {
  const files = fs.readdirSync(utilsDir);

  for (const file of files) {
    const src = path.join(utilsDir, file);
    const dest = path.join(registryDir, "utils", file);

    if (!fs.statSync(src).isFile()) continue;

    fs.ensureDirSync(path.dirname(dest));
    fs.copyFileSync(src, dest);
    console.log(`  COPY  utils/${file}`);
    count++;
  }
}

// ── 3. Preserve registry.json ─────────────────────────────────────
// registry.json lives at packages/cli/registry/registry.json
// It was backed up before wiping, restore it now
const registryJsonPath = path.join(registryDir, "registry.json");
if (registryJsonBackup) {
  fs.writeFileSync(registryJsonPath, registryJsonBackup);
  console.log(`  KEEP  registry.json`);
  count++;
} else {
  console.log("  WARN  No registry.json found — you may need to recreate it");
}

// ── 4. Sync base-tokens.css ──────────────────────────────────────
const baseTokensSrc = path.join(projectRoot, "src/lib/nnuikit-tokens.css");
if (fs.existsSync(baseTokensSrc)) {
  fs.copyFileSync(baseTokensSrc, path.join(registryDir, "base-tokens.css"));
  console.log(`  COPY  base-tokens.css`);
  count++;
}

console.log(`\nSynced ${count} files.`);
