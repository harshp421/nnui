import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const CSS_PATH = path.join(ROOT, "src/routes/layout.css");

// Component token prefixes to extract from layout.css
// Each key = component folder name, values = token prefixes to match
const COMPONENT_PREFIXES = {
  button: [
    "--color-button-",
    "--size-button-",
    "--spacing-button-",
    "--radius-button-",
  ],
  checkbox: [
    "--color-checkbox---radio-",
    "--size-checkbox---radio-",
    "--spacing-checkbox---radio-",
    "--radius-checkbox---radio-",
  ],
  input: [
    "--color-input-",
    "--size-input-",
    "--spacing-input-",
    "--radius-input-",
  ],
  progress: [
    "--color-progress-bar-",
    "--size-progress-bar-",
    "--spacing-progress-bar-",
    "--radius-progress-bar-",
  ],
  switch: [
    "--color-toggles-",
    "--size-toggle-",
    "--spacing-toggle-",
    "--radius-toggle-",
  ],
};

// Read layout.css
const css = fs.readFileSync(CSS_PATH, "utf-8");
const lines = css.split("\n");

// Track which lines to remove (by line index)
const linesToRemove = new Set();

// Extracted tokens per component: { component: { root: [], theme: [] } }
const extracted = {};
for (const comp of Object.keys(COMPONENT_PREFIXES)) {
  extracted[comp] = { root: [], theme: [] };
}

// Parse the CSS to find sections
let currentSection = null; // 'root' or 'theme'
let braceDepth = 0;
let inRoot = false;
let inTheme = false;
let inResponsive = false; // inside @media or responsive :root blocks

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  const trimmed = line.trim();

  // Track if we're inside :root or @theme
  if (trimmed === ":root {" || trimmed.startsWith(":root {")) {
    inRoot = true;
  }
  if (trimmed.startsWith("@theme {") || trimmed === "@theme {") {
    inTheme = true;
  }
  if (trimmed === "}") {
    if (inRoot) inRoot = false;
    if (inTheme) inTheme = false;
  }

  // Check each component's prefixes
  for (const [comp, prefixes] of Object.entries(COMPONENT_PREFIXES)) {
    for (const prefix of prefixes) {
      if (trimmed.startsWith(prefix)) {
        linesToRemove.add(i);

        // Also grab multi-line values (lines ending without ;)
        let fullLine = line;
        let j = i;
        while (!trimmed.endsWith(";") && !lines[j]?.trim().endsWith(";") && j < i + 5) {
          j++;
          if (j < lines.length) {
            linesToRemove.add(j);
            fullLine += "\n" + lines[j];
          }
        }

        if (inTheme) {
          extracted[comp].theme.push(fullLine);
        } else {
          extracted[comp].root.push(fullLine);
        }
        break;
      }
    }
  }
}

// Also handle lines that start with tab + prefix (inside responsive blocks etc)
for (let i = 0; i < lines.length; i++) {
  const trimmed = lines[i].trim();
  for (const [comp, prefixes] of Object.entries(COMPONENT_PREFIXES)) {
    for (const prefix of prefixes) {
      if (trimmed.startsWith(prefix) && !linesToRemove.has(i)) {
        linesToRemove.add(i);

        // Multi-line value continuation
        let j = i + 1;
        while (j < lines.length && !lines[i].trim().endsWith(";") && !lines[j - 1]?.trim().endsWith(";")) {
          if (lines[j].trim().startsWith("--") || lines[j].trim() === "}" || lines[j].trim() === "") break;
          linesToRemove.add(j);
          j++;
        }
      }
    }
  }
}

// Write tokens.css files for components that don't have one yet
for (const [comp, tokens] of Object.entries(extracted)) {
  if (tokens.root.length === 0 && tokens.theme.length === 0) continue;

  const tokensPath = path.join(ROOT, `src/lib/components/ui/${comp}/tokens.css`);
  const compName = comp.toUpperCase();

  // Normalize indentation — remove leading tabs to make them consistent
  const normalizeLines = (lines) =>
    lines.map((l) => "\t" + l.trim()).join("\n");

  const content = `/* ═══════════════════════════════════════════════════════════════════════
   ${compName} — Design Tokens
   ═══════════════════════════════════════════════════════════════════════
   These tokens power the ${comp.charAt(0).toUpperCase() + comp.slice(1)} component.
   This file is automatically added when you run: npx nnuikit add ${comp}

   Dependencies: Requires global base palette + semantic tokens from layout.css
   ═══════════════════════════════════════════════════════════════════════ */

:root {
${normalizeLines(tokens.root)}
}

@theme {
${normalizeLines(tokens.theme)}
}
`;

  fs.writeFileSync(tokensPath, content);
  console.log(`  CREATED  ${comp}/tokens.css (${tokens.root.length} root + ${tokens.theme.length} theme tokens)`);
}

// Remove extracted lines from layout.css
const cleanedLines = lines.filter((_, i) => !linesToRemove.has(i));

// Clean up double blank lines created by removal
const finalLines = [];
let prevBlank = false;
for (const line of cleanedLines) {
  const isBlank = line.trim() === "";
  if (isBlank && prevBlank) continue;
  finalLines.push(line);
  prevBlank = isBlank;
}

fs.writeFileSync(CSS_PATH, finalLines.join("\n"));
console.log(`\n  CLEANED  layout.css (removed ${linesToRemove.size} lines)`);
console.log(`  BEFORE:  ${lines.length} lines`);
console.log(`  AFTER:   ${finalLines.length} lines`);
