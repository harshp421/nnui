/**
 * nnuikit Component Registry
 *
 * This file serves as the source of truth for all available components.
 * When adding a new component, update registry.json with:
 *   - name: component name (lowercase, kebab-case)
 *   - description: short description
 *   - files: array of { path, source } for each file in the component
 *   - dependencies: npm packages required
 *   - registryDependencies: internal dependencies (e.g., "utils")
 *   - docs: route path to the documentation page
 */

import registry from "./registry.json";

export type ComponentDef = {
  name: string;
  description: string;
  files: { path: string; source: string }[];
  dependencies: string[];
  registryDependencies: string[];
  docs: string;
};

export type Registry = typeof registry;

export { registry };
export default registry;
