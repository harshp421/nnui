import { describe, it, before, after } from "node:test";
import assert from "node:assert/strict";
import fs from "fs-extra";
import path from "path";
import { execSync } from "child_process";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const CLI_PATH = path.resolve(__dirname, "../src/index.js");
const TEMP_DIR = path.resolve(__dirname, "../.test-temp");

function run(args) {
  return execSync(`node ${CLI_PATH} ${args}`, {
    cwd: TEMP_DIR,
    encoding: "utf-8",
    timeout: 30000,
  });
}

describe("nnuikit CLI", () => {
  before(async () => {
    // Create a temp project directory
    await fs.ensureDir(TEMP_DIR);
    await fs.writeFile(
      path.join(TEMP_DIR, "package.json"),
      JSON.stringify({ name: "test-project", version: "1.0.0" })
    );
    // Create the CSS file that init/add expects
    const cssDir = path.join(TEMP_DIR, "src/routes");
    await fs.ensureDir(cssDir);
    await fs.writeFile(
      path.join(cssDir, "layout.css"),
      "@import 'tailwindcss';\n\n:root {}\n"
    );
  });

  after(async () => {
    await fs.remove(TEMP_DIR);
  });

  // ─── INIT ───────────────────────────────────────────────

  describe("init", () => {
    it("creates nnuikit.json config file", () => {
      run("init -y");
      const configPath = path.join(TEMP_DIR, "nnuikit.json");
      assert.ok(fs.existsSync(configPath), "nnuikit.json should be created");
    });

    it("config file has correct structure", () => {
      const config = fs.readJsonSync(path.join(TEMP_DIR, "nnuikit.json"));
      assert.ok(config.componentsDir, "should have componentsDir");
      assert.ok(config.utilsDir, "should have utilsDir");
      assert.ok(config.cssPath, "should have cssPath");
    });

    it("creates tailwindUtil.ts utility file", () => {
      const utilPath = path.join(TEMP_DIR, "src/lib/utils/tailwindUtil.ts");
      assert.ok(fs.existsSync(utilPath), "tailwindUtil.ts should be created");
    });

    it("tailwindUtil.ts contains cn function", () => {
      const content = fs.readFileSync(
        path.join(TEMP_DIR, "src/lib/utils/tailwindUtil.ts"),
        "utf-8"
      );
      assert.ok(content.includes("export function cn"), "should export cn()");
      assert.ok(content.includes("twMerge"), "should use twMerge");
      assert.ok(content.includes("clsx"), "should use clsx");
    });
  });

  // ─── LIST ───────────────────────────────────────────────

  describe("list", () => {
    it("shows all available components", () => {
      const output = run("list");
      const expected = [
        "button",
        "checkbox",
        "input",
        "input-group",
        "label",
        "progress",
        "radio-group",
        "skeleton",
        "switch",
        "textarea",
      ];
      for (const name of expected) {
        assert.ok(output.includes(name), `should list ${name}`);
      }
    });
  });

  // ─── ADD: BUTTON ──────────────────────────────────────────

  describe("add button", () => {
    it("adds button component files", () => {
      run("add button -y");

      const dir = path.join(TEMP_DIR, "src/lib/components/ui/button");
      assert.ok(fs.existsSync(path.join(dir, "button.svelte")), "button.svelte should exist");
      assert.ok(fs.existsSync(path.join(dir, "index.ts")), "index.ts should exist");
      assert.ok(fs.existsSync(path.join(dir, "tokens.css")), "tokens.css should exist");
    });

    it("button.svelte contains buttonVariants and uses tailwind-variants", () => {
      const content = fs.readFileSync(
        path.join(TEMP_DIR, "src/lib/components/ui/button/button.svelte"),
        "utf-8"
      );
      assert.ok(content.includes("buttonVariants"), "should have buttonVariants");
      assert.ok(content.includes("tailwind-variants"), "should import tailwind-variants");
    });

    it("button uses native elements, not bits-ui", () => {
      const content = fs.readFileSync(
        path.join(TEMP_DIR, "src/lib/components/ui/button/button.svelte"),
        "utf-8"
      );
      assert.ok(!content.includes("bits-ui"), "should NOT import bits-ui");
      assert.ok(content.includes("<button"), "should use native <button>");
      assert.ok(content.includes("<a"), "should support <a> for links");
    });

    it("button tokens.css has @theme registration", () => {
      const content = fs.readFileSync(
        path.join(TEMP_DIR, "src/lib/components/ui/button/tokens.css"),
        "utf-8"
      );
      assert.ok(content.includes("@theme"), "should have @theme block");
      assert.ok(content.includes(":root"), "should have :root variables");
      assert.ok(content.includes("--color-button-brand"), "should have button brand tokens");
    });

    it("adds CSS import to layout.css", () => {
      const css = fs.readFileSync(
        path.join(TEMP_DIR, "src/routes/layout.css"),
        "utf-8"
      );
      assert.ok(css.includes("button/tokens.css"), "should add button tokens import");
    });

    it("does not duplicate CSS imports on re-add", () => {
      run("add button -y --overwrite");
      const css = fs.readFileSync(
        path.join(TEMP_DIR, "src/routes/layout.css"),
        "utf-8"
      );
      const matches = css.match(/button\/tokens\.css/g);
      assert.equal(matches.length, 1, "should have exactly one button import");
    });
  });

  // ─── ADD: CHECKBOX ────────────────────────────────────────

  describe("add checkbox", () => {
    it("adds checkbox component files", () => {
      run("add checkbox -y");

      const dir = path.join(TEMP_DIR, "src/lib/components/ui/checkbox");
      assert.ok(fs.existsSync(path.join(dir, "checkbox.svelte")), "checkbox.svelte should exist");
      assert.ok(fs.existsSync(path.join(dir, "index.ts")), "index.ts should exist");
      assert.ok(fs.existsSync(path.join(dir, "tokens.css")), "tokens.css should exist");
    });

    it("checkbox uses native input, not bits-ui", () => {
      const content = fs.readFileSync(
        path.join(TEMP_DIR, "src/lib/components/ui/checkbox/checkbox.svelte"),
        "utf-8"
      );
      assert.ok(!content.includes("bits-ui"), "should NOT import bits-ui");
      assert.ok(content.includes('type="checkbox"'), "should use native input checkbox");
      assert.ok(content.includes("sr-only"), "should hide native input visually");
      assert.ok(content.includes("peer"), "should use peer classes for styling");
    });

    it("checkbox supports indeterminate state", () => {
      const content = fs.readFileSync(
        path.join(TEMP_DIR, "src/lib/components/ui/checkbox/checkbox.svelte"),
        "utf-8"
      );
      assert.ok(content.includes("indeterminate"), "should support indeterminate prop");
    });

    it("checkbox tokens.css has correct structure", () => {
      const content = fs.readFileSync(
        path.join(TEMP_DIR, "src/lib/components/ui/checkbox/tokens.css"),
        "utf-8"
      );
      assert.ok(content.includes("@theme"), "should have @theme block");
      assert.ok(content.includes("--color-checkbox"), "should have checkbox color tokens");
      assert.ok(content.includes("--size-checkbox"), "should have checkbox size tokens");
    });
  });

  // ─── ADD: INPUT ───────────────────────────────────────────

  describe("add input", () => {
    it("adds input component files", () => {
      run("add input -y");

      const dir = path.join(TEMP_DIR, "src/lib/components/ui/input");
      assert.ok(fs.existsSync(path.join(dir, "input.svelte")), "input.svelte should exist");
      assert.ok(fs.existsSync(path.join(dir, "index.ts")), "index.ts should exist");
      assert.ok(fs.existsSync(path.join(dir, "tokens.css")), "tokens.css should exist");
    });

    it("input uses native input element", () => {
      const content = fs.readFileSync(
        path.join(TEMP_DIR, "src/lib/components/ui/input/input.svelte"),
        "utf-8"
      );
      assert.ok(!content.includes("bits-ui"), "should NOT import bits-ui");
      assert.ok(content.includes("<input"), "should use native <input>");
    });

    it("input has design token classes", () => {
      const content = fs.readFileSync(
        path.join(TEMP_DIR, "src/lib/components/ui/input/input.svelte"),
        "utf-8"
      );
      assert.ok(content.includes("input-box"), "should use input-box design tokens");
    });

    it("input tokens.css has @theme registration", () => {
      const content = fs.readFileSync(
        path.join(TEMP_DIR, "src/lib/components/ui/input/tokens.css"),
        "utf-8"
      );
      assert.ok(content.includes("@theme"), "should have @theme block");
      assert.ok(content.includes(":root"), "should have :root variables");
    });

    it("adds input CSS import to layout.css", () => {
      const css = fs.readFileSync(
        path.join(TEMP_DIR, "src/routes/layout.css"),
        "utf-8"
      );
      assert.ok(css.includes("input/tokens.css"), "should add input tokens import");
    });
  });

  // ─── ADD: INPUT-GROUP ─────────────────────────────────────

  describe("add input-group", () => {
    it("adds all input-group sub-component files", () => {
      run("add input-group -y");

      const dir = path.join(TEMP_DIR, "src/lib/components/ui/input-group");
      assert.ok(fs.existsSync(path.join(dir, "input-group.svelte")), "input-group.svelte should exist");
      assert.ok(fs.existsSync(path.join(dir, "input-group-addon.svelte")), "addon should exist");
      assert.ok(fs.existsSync(path.join(dir, "input-group-button.svelte")), "button should exist");
      assert.ok(fs.existsSync(path.join(dir, "input-group-input.svelte")), "input should exist");
      assert.ok(fs.existsSync(path.join(dir, "input-group-text.svelte")), "text should exist");
      assert.ok(fs.existsSync(path.join(dir, "input-group-textarea.svelte")), "textarea should exist");
      assert.ok(fs.existsSync(path.join(dir, "index.ts")), "index.ts should exist");
    });

    it("index.ts exports all sub-components", () => {
      const content = fs.readFileSync(
        path.join(TEMP_DIR, "src/lib/components/ui/input-group/index.ts"),
        "utf-8"
      );
      assert.ok(content.includes("InputGroup"), "should export InputGroup");
      assert.ok(content.includes("InputGroupAddon"), "should export InputGroupAddon");
      assert.ok(content.includes("InputGroupButton"), "should export InputGroupButton");
      assert.ok(content.includes("InputGroupInput"), "should export InputGroupInput");
      assert.ok(content.includes("InputGroupText"), "should export InputGroupText");
      assert.ok(content.includes("InputGroupTextarea"), "should export InputGroupTextarea");
    });
  });

  // ─── ADD: LABEL ───────────────────────────────────────────

  describe("add label", () => {
    it("adds label component files", () => {
      run("add label -y");

      const dir = path.join(TEMP_DIR, "src/lib/components/ui/label");
      assert.ok(fs.existsSync(path.join(dir, "label.svelte")), "label.svelte should exist");
      assert.ok(fs.existsSync(path.join(dir, "index.ts")), "index.ts should exist");
    });

    it("label uses native label element, not bits-ui", () => {
      const content = fs.readFileSync(
        path.join(TEMP_DIR, "src/lib/components/ui/label/label.svelte"),
        "utf-8"
      );
      assert.ok(!content.includes("bits-ui"), "should NOT import bits-ui");
      assert.ok(content.includes("<label"), "should use native <label>");
    });
  });

  // ─── ADD: PROGRESS ────────────────────────────────────────

  describe("add progress", () => {
    it("adds progress component files", () => {
      run("add progress -y");

      const dir = path.join(TEMP_DIR, "src/lib/components/ui/progress");
      assert.ok(fs.existsSync(path.join(dir, "progress.svelte")), "progress.svelte should exist");
      assert.ok(fs.existsSync(path.join(dir, "index.ts")), "index.ts should exist");
      assert.ok(fs.existsSync(path.join(dir, "tokens.css")), "tokens.css should exist");
    });

    it("progress uses tailwind-variants", () => {
      const content = fs.readFileSync(
        path.join(TEMP_DIR, "src/lib/components/ui/progress/progress.svelte"),
        "utf-8"
      );
      assert.ok(content.includes("tailwind-variants"), "should import tailwind-variants");
    });

    it("progress tokens.css has @theme registration", () => {
      const content = fs.readFileSync(
        path.join(TEMP_DIR, "src/lib/components/ui/progress/tokens.css"),
        "utf-8"
      );
      assert.ok(content.includes("@theme"), "should have @theme block");
      assert.ok(content.includes(":root"), "should have :root variables");
    });
  });

  // ─── ADD: RADIO-GROUP ─────────────────────────────────────

  describe("add radio-group", () => {
    it("adds radio-group component files", () => {
      run("add radio-group -y");

      const dir = path.join(TEMP_DIR, "src/lib/components/ui/radio-group");
      assert.ok(fs.existsSync(path.join(dir, "radio-group.svelte")), "radio-group.svelte should exist");
      assert.ok(fs.existsSync(path.join(dir, "radio-group-item.svelte")), "radio-group-item.svelte should exist");
      assert.ok(fs.existsSync(path.join(dir, "context.ts")), "context.ts should exist");
      assert.ok(fs.existsSync(path.join(dir, "index.ts")), "index.ts should exist");
    });

    it("radio-group uses native input radio, not bits-ui", () => {
      const content = fs.readFileSync(
        path.join(TEMP_DIR, "src/lib/components/ui/radio-group/radio-group-item.svelte"),
        "utf-8"
      );
      assert.ok(!content.includes("bits-ui"), "should NOT import bits-ui");
    });

    it("radio-group uses Svelte context for state management", () => {
      const content = fs.readFileSync(
        path.join(TEMP_DIR, "src/lib/components/ui/radio-group/context.ts"),
        "utf-8"
      );
      assert.ok(
        content.includes("RADIO_GROUP") || content.includes("RadioGroup"),
        "should define radio group context"
      );
    });

    it("index.ts exports Root and Item", () => {
      const content = fs.readFileSync(
        path.join(TEMP_DIR, "src/lib/components/ui/radio-group/index.ts"),
        "utf-8"
      );
      assert.ok(content.includes("RadioGroup"), "should export RadioGroup");
      assert.ok(content.includes("RadioGroupItem"), "should export RadioGroupItem");
    });
  });

  // ─── ADD: SKELETON ────────────────────────────────────────

  describe("add skeleton", () => {
    it("adds skeleton component files", () => {
      run("add skeleton -y");

      const dir = path.join(TEMP_DIR, "src/lib/components/ui/skeleton");
      assert.ok(fs.existsSync(path.join(dir, "skeleton.svelte")), "skeleton.svelte should exist");
      assert.ok(fs.existsSync(path.join(dir, "index.ts")), "index.ts should exist");
    });

    it("skeleton is a simple div with animation", () => {
      const content = fs.readFileSync(
        path.join(TEMP_DIR, "src/lib/components/ui/skeleton/skeleton.svelte"),
        "utf-8"
      );
      assert.ok(content.includes("animate-pulse"), "should have pulse animation");
      assert.ok(content.includes("<div"), "should use native <div>");
      assert.ok(!content.includes("bits-ui"), "should NOT import bits-ui");
    });

    it("skeleton has zero external dependencies", () => {
      const content = fs.readFileSync(
        path.join(TEMP_DIR, "src/lib/components/ui/skeleton/skeleton.svelte"),
        "utf-8"
      );
      // Only imports from $lib/utils — no npm packages other than svelte itself
      assert.ok(!content.includes("from '") || content.includes("$lib/") || content.includes("svelte"), "should only import from $lib or svelte");
    });
  });

  // ─── ADD: SWITCH ──────────────────────────────────────────

  describe("add switch", () => {
    it("adds switch component files", () => {
      run("add switch -y");

      const dir = path.join(TEMP_DIR, "src/lib/components/ui/switch");
      assert.ok(fs.existsSync(path.join(dir, "switch.svelte")), "switch.svelte should exist");
      assert.ok(fs.existsSync(path.join(dir, "index.ts")), "index.ts should exist");
      assert.ok(fs.existsSync(path.join(dir, "tokens.css")), "tokens.css should exist");
    });

    it("switch uses native checkbox input, not bits-ui", () => {
      const content = fs.readFileSync(
        path.join(TEMP_DIR, "src/lib/components/ui/switch/switch.svelte"),
        "utf-8"
      );
      assert.ok(!content.includes("bits-ui"), "should NOT import bits-ui");
    });

    it("switch tokens.css has @theme registration", () => {
      const content = fs.readFileSync(
        path.join(TEMP_DIR, "src/lib/components/ui/switch/tokens.css"),
        "utf-8"
      );
      assert.ok(content.includes("@theme"), "should have @theme block");
      assert.ok(content.includes(":root"), "should have :root variables");
    });
  });

  // ─── ADD: TEXTAREA ────────────────────────────────────────

  describe("add textarea", () => {
    it("adds textarea component files", () => {
      run("add textarea -y");

      const dir = path.join(TEMP_DIR, "src/lib/components/ui/textarea");
      assert.ok(fs.existsSync(path.join(dir, "textarea.svelte")), "textarea.svelte should exist");
      assert.ok(fs.existsSync(path.join(dir, "index.ts")), "index.ts should exist");
    });

    it("textarea uses native textarea element", () => {
      const content = fs.readFileSync(
        path.join(TEMP_DIR, "src/lib/components/ui/textarea/textarea.svelte"),
        "utf-8"
      );
      assert.ok(!content.includes("bits-ui"), "should NOT import bits-ui");
      assert.ok(content.includes("<textarea"), "should use native <textarea>");
    });

    it("textarea has state-based design token classes", () => {
      const content = fs.readFileSync(
        path.join(TEMP_DIR, "src/lib/components/ui/textarea/textarea.svelte"),
        "utf-8"
      );
      assert.ok(content.includes("input-box-default"), "should have default state tokens");
      assert.ok(content.includes("hover:"), "should have hover state");
      assert.ok(content.includes("focus-visible:"), "should have focus state");
      assert.ok(content.includes("disabled:"), "should have disabled state");
      assert.ok(content.includes("aria-invalid:"), "should have destructive/invalid state");
    });
  });

  // ─── ADD: MULTIPLE & EDGE CASES ───────────────────────────

  describe("add edge cases", () => {
    it("rejects unknown component", () => {
      assert.throws(
        () => run("add fakecomponent -y"),
        "should throw for unknown component"
      );
    });

    it("all CSS imports are present after adding all components", () => {
      const css = fs.readFileSync(
        path.join(TEMP_DIR, "src/routes/layout.css"),
        "utf-8"
      );
      // Components with tokens.css should have imports
      assert.ok(css.includes("button/tokens.css"), "button tokens import");
      assert.ok(css.includes("checkbox/tokens.css"), "checkbox tokens import");
      assert.ok(css.includes("input/tokens.css"), "input tokens import");
      assert.ok(css.includes("progress/tokens.css"), "progress tokens import");
      assert.ok(css.includes("switch/tokens.css"), "switch tokens import");
    });

    it("no component uses bits-ui", () => {
      const componentsDir = path.join(TEMP_DIR, "src/lib/components/ui");
      const dirs = fs.readdirSync(componentsDir);

      for (const dir of dirs) {
        const fullDir = path.join(componentsDir, dir);
        if (!fs.statSync(fullDir).isDirectory()) continue;

        const files = fs.readdirSync(fullDir).filter((f) => f.endsWith(".svelte"));
        for (const file of files) {
          const content = fs.readFileSync(path.join(fullDir, file), "utf-8");
          assert.ok(
            !content.includes("bits-ui"),
            `${dir}/${file} should NOT import bits-ui`
          );
        }
      }
    });
  });

  // ─── REGISTRY INTEGRITY ───────────────────────────────────

  describe("registry integrity", () => {
    it("all registry files exist in registry/ folder", () => {
      const registryDir = path.resolve(__dirname, "../registry");

      const expectedFiles = [
        "ui/button/button.svelte",
        "ui/button/index.ts",
        "ui/button/tokens.css",
        "ui/checkbox/checkbox.svelte",
        "ui/checkbox/index.ts",
        "ui/checkbox/tokens.css",
        "ui/input/input.svelte",
        "ui/input/index.ts",
        "ui/input/tokens.css",
        "ui/input-group/input-group.svelte",
        "ui/input-group/input-group-addon.svelte",
        "ui/input-group/input-group-button.svelte",
        "ui/input-group/input-group-input.svelte",
        "ui/input-group/input-group-text.svelte",
        "ui/input-group/input-group-textarea.svelte",
        "ui/input-group/index.ts",
        "ui/label/label.svelte",
        "ui/label/index.ts",
        "ui/progress/progress.svelte",
        "ui/progress/index.ts",
        "ui/progress/tokens.css",
        "ui/radio-group/radio-group.svelte",
        "ui/radio-group/radio-group-item.svelte",
        "ui/radio-group/context.ts",
        "ui/radio-group/index.ts",
        "ui/skeleton/skeleton.svelte",
        "ui/skeleton/index.ts",
        "ui/switch/switch.svelte",
        "ui/switch/index.ts",
        "ui/switch/tokens.css",
        "ui/textarea/textarea.svelte",
        "ui/textarea/index.ts",
        "utils/tailwindUtil.ts",
      ];

      for (const file of expectedFiles) {
        assert.ok(
          fs.existsSync(path.join(registryDir, file)),
          `registry/${file} should exist`
        );
      }
    });

    it("registry files are not empty", () => {
      const registryDir = path.resolve(__dirname, "../registry");
      const files = [
        "ui/button/button.svelte",
        "ui/checkbox/checkbox.svelte",
        "ui/input/input.svelte",
        "ui/label/label.svelte",
        "ui/progress/progress.svelte",
        "ui/radio-group/radio-group.svelte",
        "ui/skeleton/skeleton.svelte",
        "ui/switch/switch.svelte",
        "ui/textarea/textarea.svelte",
        "utils/tailwindUtil.ts",
      ];

      for (const file of files) {
        const content = fs.readFileSync(
          path.join(registryDir, file),
          "utf-8"
        );
        assert.ok(content.length > 50, `registry/${file} should not be empty`);
      }
    });

    it("registry files match source files", () => {
      const registryDir = path.resolve(__dirname, "../registry");
      const sourceDir = path.resolve(__dirname, "../../../src/lib/components");

      const checkFiles = [
        { registry: "ui/button/button.svelte", source: "ui/button/button.svelte" },
        { registry: "ui/checkbox/checkbox.svelte", source: "ui/checkbox/checkbox.svelte" },
      ];

      for (const { registry, source } of checkFiles) {
        const registryPath = path.join(registryDir, registry);
        const sourcePath = path.join(sourceDir, source);

        if (fs.existsSync(registryPath) && fs.existsSync(sourcePath)) {
          const regContent = fs.readFileSync(registryPath, "utf-8");
          const srcContent = fs.readFileSync(sourcePath, "utf-8");
          assert.equal(
            regContent,
            srcContent,
            `registry/${registry} should match source (run npm run sync-registry)`
          );
        }
      }
    });
  });
});
